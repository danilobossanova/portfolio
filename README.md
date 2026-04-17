# Portfólio — Danilo Fernando - Engenheiro de Software Senior

Portfólio pessoal construído como SSG (Static Site Generation) em **Nuxt 3 + TypeScript + Tailwind**, com arquitetura limpa (Clean Architecture) e suporte a **i18n (pt-BR / en)**. Ele foi desenhado para funcionar hoje com dados estáticos e amanhã consumir uma API (CMS headless, Spring Boot ou Laravel) **sem tocar em uma linha da camada de apresentação**.

## Destaques

- **Nuxt 3** com `nitro.preset = 'static'` → gera HTML puro em `.output/public/` via `npm run generate`.
- **i18n** via `@nuxtjs/i18n` (`pt-BR` como default, `en` em `/en/...`).
- **Clean Architecture** em `core/` — domínio, aplicação, infraestrutura isolados.
- **Dependency Injection** via plugin Nuxt (composition root em `core/application/container.ts`).
- **Repositórios plugáveis** — estáticos agora, HTTP quando a API existir (`NUXT_PUBLIC_USE_HTTP_REPOSITORIES=true`).
- **Vitest** para testes unitários do domínio e da infraestrutura.
- **ESLint + Prettier** (`eslint.config.js`, `.prettierrc`).
- **Acessibilidade** — skip-link, `aria-label` nos botões de ícone, tokens de tema com contraste consciente.
- **SEO** — `useHead` com título, descrição, Open Graph e canonical por rota.

## Rotas

| Rota                     | Descrição                                        |
| ------------------------ | ------------------------------------------------ |
| `/`                      | Home (todas as seções)                           |
| `/projetos`              | Lista de case studies                            |
| `/projetos/[slug]`       | Detalhe do projeto                               |
| `/artigos`               | Lista de artigos                                 |
| `/artigos/[slug]`        | Detalhe do artigo                                |
| `/busca?q=...`           | Busca em artigos (debounced, query string)       |
| `/contato`               | Contato                                          |
| `/en/...`                | Todas as rotas acima, em inglês                  |

## Scripts

```bash
npm install
npm run dev        # Dev server Nuxt em http://localhost:3000
npm run generate   # Gera o site estático em .output/public/
npm run preview    # Serve o build localmente
npm run lint       # ESLint + typecheck
npm run test       # Vitest
npm run test:watch
```

## Migrando para a API (futuro)

Quando o CMS (Strapi, Directus) ou o backend (Spring Boot, Laravel) estiver pronto:

1. Setar no `.env`:
   ```env
   NUXT_PUBLIC_USE_HTTP_REPOSITORIES=true
   NUXT_PUBLIC_API_BASE_URL=https://api.seu-dominio.com
   ```
2. O `plugins/container.ts` injetará os repositórios HTTP automaticamente. **Nenhum componente precisa ser alterado.**
3. Ajustar parsing/contratos nos `core/infrastructure/repositories/http/*` se o schema da API divergir do domínio.

## Estrutura

```
portfolio/
├── core/                         # Clean Architecture
│   ├── domain/                   # Entidades + interfaces (sem framework)
│   ├── application/              # Use cases + composition root
│   └── infrastructure/           # Repositórios estáticos + HTTP + seeds
├── components/
│   ├── common/                   # Navbar, Footer, Cards, SearchBar...
│   └── sections/                 # Seções da home
├── composables/                  # Wrappers Vue/Nuxt sobre os use cases
├── pages/                        # Rotas (home, projetos, artigos, busca, contato)
├── layouts/default.vue
├── plugins/container.ts          # DI do container
├── i18n/locales/{pt-BR,en}.json
├── assets/css/main.css           # Tailwind + design tokens
├── tests/unit/                   # Vitest
├── nuxt.config.ts
├── tailwind.config.ts
└── eslint.config.js
```

## Licença

MIT — este é um portfólio pessoal.
