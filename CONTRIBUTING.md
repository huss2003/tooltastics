# Contributing

Thanks for your interest in contributing to RulerKit.

## Setup

```bash
git clone <your-fork>
cd ruler
npm install
npm run dev
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run format` | Format with Prettier |
| `npm run check` | Run lint + typecheck + build |

## Pull Requests

1. Fork the repo and create a branch from `main`.
2. Run `npm run check` locally and ensure all checks pass.
3. Write tests for new features where applicable.
4. Keep PRs focused — one feature or fix per PR.
5. Update `CHANGELOG.md` under an `Unreleased` section.
6. Open a PR against `main` with a clear title and description.

## Code Style

- **Prettier** for formatting — run `npm run format` before committing.
- **ESLint** for linting — run `npm run lint` to catch issues.
- Follow existing patterns in the codebase.
- Use TypeScript — avoid `any` and `as` casts where possible.
- Use `import type` for type-only imports.

## Branch Naming

- `feat/<short-description>` — new features
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling, deps, CI
- `docs/<short-description>` — documentation

## Locale Contributions

See `src/i18n/locales/` for existing translations. Add or update your locale file and ensure `PUBLIC_LOCALES` in `.env` includes it.
