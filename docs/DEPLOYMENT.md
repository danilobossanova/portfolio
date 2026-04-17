# Deployment — Cloudflare Pages

Runbook para publicar o portfólio em produção via GitHub Actions + Cloudflare Pages.

Ambiente alvo: **https://danilofernando.dev** (DNS registrado na Cloudflare).

---

## 1. Visão geral do pipeline

```
push/PR → main/develop ──► CI (lint + test + build)
                           CodeQL (SAST)
                           Dependency Review (PR only)

push → main             ──► Deploy workflow
                            ├─ npm ci
                            ├─ npm run generate (NUXT_PUBLIC_SITE_URL = prod)
                            └─ wrangler pages deploy .output/public
```

- **Branch `main`** → produção (`danilofernando.dev`).
- **Branch `develop`** → integração (sem deploy automático por enquanto).
- **Branches `feature/*`** → PRs contra `develop`.

---

## 2. Pré-requisitos no Cloudflare

### 2.1 Criar o projeto Pages

1. Dashboard Cloudflare → **Workers & Pages → Create application → Pages → Direct Upload**.
   - Nome do projeto: **`danilofernando-dev`** (precisa bater com o `--project-name` em `.github/workflows/deploy.yml`).
   - Faça um primeiro upload vazio ou deixe o deploy do GitHub Action criar o primeiro build.
2. **NÃO** conecte o repositório via "Git Integration" da Cloudflare — nosso CI/CD fica no GitHub, a Cloudflare só recebe o artefato via Wrangler.

### 2.2 Gerar o API Token

1. **My Profile → API Tokens → Create Token → Custom Token**.
2. Permissões **mínimas**:
   - `Account` → `Cloudflare Pages` → **Edit**
   - `User` → `User Details` → **Read** (o Wrangler valida a identidade)
3. Account resources: restrinja à conta específica do domínio.
4. TTL: opcional (recomendado rotacionar a cada 90 dias).
5. Copie o token — ele só é mostrado uma vez.

### 2.3 Descobrir o Account ID

Dashboard → barra lateral direita em qualquer página da conta → **Account ID** (string hex de 32 caracteres).

---

## 3. Configurar os secrets no GitHub

Em `Settings → Secrets and variables → Actions`:

### Environment `production` (criar se não existir)

- `CLOUDFLARE_API_TOKEN` → token gerado em 2.2
- `CLOUDFLARE_ACCOUNT_ID` → Account ID de 2.3

Use **Environment secrets**, não repository secrets, para que o deploy exija aprovação manual (opcional) e os secrets nunca vazem para PRs de forks.

### Proteções recomendadas para o environment

- `Required reviewers` → o próprio dono (auto-review é permitido).
- `Wait timer` → 0 (ou 5 minutos se quiser janela de cancelamento).
- `Deployment branches` → **Selected branches → `main`** (bloqueia deploy a partir de outras branches).

---

## 4. Proteger as branches

Em `Settings → Branches → Add classic branch protection rule`:

### Regra para `main`

- ✅ Require a pull request before merging
  - ✅ Require approvals (1)
  - ✅ Dismiss stale approvals on new commits
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date
  - Required checks: `CI / Lint, test and build`, `CodeQL / Analyze (javascript-typescript)`
- ✅ Require conversation resolution before merging
- ✅ Require signed commits *(opcional, se GPG estiver configurado)*
- ✅ Require linear history
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes
- ❌ Allow deletions

### Regra para `develop`

- Similar a `main`, mas com 0 aprovações obrigatórias (trabalho solo).
- Required checks: `CI / Lint, test and build`, `CodeQL / Analyze`, `Dependency Review`.

---

## 5. Apontar o domínio custom

1. No projeto Pages → **Custom domains → Set up a custom domain**.
2. Informe `danilofernando.dev` e depois `www.danilofernando.dev`.
3. Cloudflare detecta o domínio já gerenciado na mesma conta e adiciona os registros `CNAME` automaticamente.
4. Habilite **Always Use HTTPS** no módulo SSL/TLS do Cloudflare.
5. SSL/TLS mode → **Full (strict)**.
6. Habilite **Automatic HTTPS Rewrites**.

---

## 6. Validação pós-deploy

Após o primeiro `git push origin main`:

1. Aba **Actions** no GitHub → workflow `Deploy to Cloudflare Pages` deve concluir verde.
2. Abrir `https://danilofernando.dev` e conferir:
   - Status 200, TLS válido, redirecionamento de `http://` para `https://`.
   - Headers de resposta via `curl -I`:
     ```
     strict-transport-security: max-age=63072000; includeSubDomains; preload
     content-security-policy: default-src 'self'; ...
     x-frame-options: DENY
     x-content-type-options: nosniff
     referrer-policy: strict-origin-when-cross-origin
     permissions-policy: ...
     ```
3. Rodar scans externos:
   - **Mozilla Observatory** — https://observatory.mozilla.org/analyze/danilofernando.dev — meta: nota **A+** (sem inline scripts futuros e fonts self-hosted).
   - **SSL Labs** — https://www.ssllabs.com/ssltest/analyze.html?d=danilofernando.dev — meta: **A**.
   - **securityheaders.com** — meta: **A**.

---

## 7. Rollback

- Deploy prévio continua imutável em `.output/public/` no artefato do Actions (retenção 7 dias).
- Via dashboard: **Pages → danilofernando-dev → Deployments** → reverter para um deploy anterior com um clique.
- Via Git: `git revert <sha>` em `main` dispara um novo deploy corrigido.

---

## 8. Operações comuns

### Abrir uma nova feature

```bash
git checkout develop
git pull --rebase
git checkout -b feature/<nome-curto>
# ...trabalho...
git push -u origin feature/<nome-curto>
gh pr create --base develop
```

### Publicar uma release

```bash
git checkout develop
git pull --rebase
git checkout main
git merge --no-ff develop -m "chore(release): vX.Y.Z"
git tag -a vX.Y.Z -m "Release X.Y.Z"
git push origin main develop --follow-tags
```

O push em `main` dispara o deploy. A tag serve de ponto de restauração.

### Rotacionar o API Token

1. Gerar novo token no Cloudflare (seção 2.2).
2. Atualizar o secret `CLOUDFLARE_API_TOKEN` no environment `production`.
3. Revogar o token antigo no dashboard.

---

## 9. Checklist de segurança contínua

- [ ] Dependabot abre PRs semanais — revisar e mergear no máximo em 7 dias.
- [ ] CodeQL alerts em `Security → Code scanning` devem ser triados em até 30 dias.
- [ ] Rotacionar `CLOUDFLARE_API_TOKEN` a cada 90 dias.
- [ ] Revisar `public/_headers` sempre que adicionar novas origens (fontes, analytics, API).
- [ ] Atualizar `public/.well-known/security.txt` (`Expires`) antes de expirar.
- [ ] Conferir Mozilla Observatory após cada release significativa.
