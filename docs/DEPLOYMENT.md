# Deployment — Cloudflare Pages

Runbook para publicar o portfólio em **https://danilofernando.dev**.

---

## 1. Arquitetura do pipeline

```
                     GitHub                          Cloudflare
                     ──────                          ──────────

push → main/develop ─► CI workflow                   Git webhook ─► Pages build
                       (lint + test + build)                        (npm run generate)
                       CodeQL (SAST)                                .output/public
                       Dependency Review                            ↓
                       Dependabot                                   danilofernando.dev
```

- **Build e deploy** são responsabilidade da Cloudflare, disparados pelo webhook
  do GitHub. O projeto Pages lê `npm run generate`, publica `.output/public/` e
  aplica custom domain + TLS automaticamente.
- **GitHub Actions** cuida só das garantias de qualidade: lint, type-check,
  testes, análise estática (CodeQL), revisão de dependências (dependency-review,
  Dependabot). Não faz deploy.
- **Branch `main`** → produção (`danilofernando.dev`).
- **Branch `develop`** e **`feature/*`** → preview deploys automáticos em URLs
  únicos `*.danilofernando-dev.pages.dev` (uma per commit).

---

## 2. Configuração do projeto na Cloudflare

### 2.1 Build settings

Em **Workers & Pages → `danilofernando-dev` → Settings → Builds & deployments**:

| Campo | Valor |
| --- | --- |
| Framework preset | Nuxt.js |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |
| Root directory | *(vazio)* |
| Production branch | `main` |
| Preview branches | "All non-production branches" |

### 2.2 Environment variables

Definidas em **Settings → Environment variables** (escopo: Production + Preview):

| Variável | Valor | Observação |
| --- | --- | --- |
| `NODE_VERSION` | `22` | Casa com `.nvmrc` |
| `NUXT_PUBLIC_SITE_URL` | `https://danilofernando.dev` | Canonical / OG / sitemap |
| `NUXT_PUBLIC_USE_HTTP_REPOSITORIES` | `false` | Enquanto não há CMS |

Nenhum secret precisa ser cadastrado — não há chamada à API Cloudflare feita
a partir do GitHub.

### 2.3 Custom domain e SSL/TLS

1. **Workers & Pages → `danilofernando-dev` → Custom domains → Set up a custom domain**:
   - `danilofernando.dev` e `www.danilofernando.dev`
   - Cloudflare detecta o DNS na mesma conta e cria os CNAMEs automaticamente.
2. Na zona `danilofernando.dev`:
   - **SSL/TLS → Overview** → **Full (strict)**.
   - **SSL/TLS → Edge Certificates** → **Always Use HTTPS** = ON.
   - **SSL/TLS → Edge Certificates** → **Automatic HTTPS Rewrites** = ON.

---

## 3. Proteção das branches no GitHub

Em `Settings → Branches → Add branch protection rule`:

### Regra para `main`

- ✅ Require a pull request before merging (1 approval)
- ✅ Dismiss stale approvals on new commits
- ✅ Require status checks to pass before merging
  - Required: `CI / Lint, test and build`, `CodeQL / Analyze`, `Dependency Review`
- ✅ Require branches to be up to date
- ✅ Require conversation resolution before merging
- ✅ Require linear history
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes / deletions

### Regra para `develop`

Similar, porém com 0 aprovações obrigatórias (trabalho solo). Preview deploys
da Cloudflare são gatilho informal de revisão visual.

---

## 4. Validação pós-deploy

Após o primeiro push em `main`:

1. Aba **Deployments** do projeto Pages → build verde.
2. Abrir `https://danilofernando.dev` — status 200 e redirect `http → https`.
3. Validar response headers com `curl -I`:
   ```
   strict-transport-security: max-age=63072000; includeSubDomains; preload
   content-security-policy: default-src 'self'; ...
   x-frame-options: DENY
   x-content-type-options: nosniff
   referrer-policy: strict-origin-when-cross-origin
   permissions-policy: ...
   ```
4. Auditorias externas:
   - **Mozilla Observatory** — https://observatory.mozilla.org/analyze/danilofernando.dev — meta: **A+**.
   - **SSL Labs** — https://www.ssllabs.com/ssltest/analyze.html?d=danilofernando.dev — meta: **A**.
   - **securityheaders.com** — meta: **A**.
   - **PageSpeed Insights** — https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdanilofernando.dev — meta: Core Web Vitals todos verdes.

---

## 5. Rollback

No dashboard da Cloudflare Pages:

- **Deployments** lista todos os builds anteriores. Clicar em `...` de um build
  saudável → **Rollback to this deployment** — ação em 1 clique, TLS/DNS
  preservados.

Via Git: `git revert <sha>` em `main` + push dispara um novo build Pages
corrigido.

---

## 6. Operações comuns

### Abrir uma nova feature

```bash
git checkout develop
git pull --rebase
git checkout -b feature/<nome-curto>
# ...trabalho...
git push -u origin feature/<nome-curto>
gh pr create --base develop
```

A Cloudflare publica um preview deploy automaticamente; o link aparece
como comentário no PR (via app Cloudflare Pages).

### Publicar uma release

```bash
git checkout develop && git pull --rebase
git checkout main
git merge --no-ff develop -m "chore(release): vX.Y.Z"
git tag -a vX.Y.Z -m "Release X.Y.Z"
git push origin main develop --follow-tags
```

O push em `main` dispara o deploy de produção. A tag serve de âncora para
rollback rápido via Git.

---

## 7. Checklist de segurança contínua

- [ ] Dependabot abre PRs semanais — revisar e mergear em até 7 dias.
- [ ] CodeQL alerts em `Security → Code scanning` triados em até 30 dias.
- [ ] Revisar `public/_headers` sempre que incluir novas origens (fontes,
      analytics, API).
- [ ] Atualizar `public/.well-known/security.txt` (`Expires`) antes de expirar.
- [ ] Rodar Mozilla Observatory + PageSpeed após cada release com mudança
      visível de surface.
