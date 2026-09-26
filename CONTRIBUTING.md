# Contributing

Thanks for contributing to moduix. This guide covers the repository workflows; the component
contracts themselves are described in [AGENTS.md](./AGENTS.md) and the shipped package docs.

## Prerequisites

- Node.js 24 or newer (the repository declares `devEngines.runtime`, so pnpm can fetch it)
- pnpm 12.4.1 (pinned through `packageManager`; enable Corepack with `corepack enable`)

```bash
pnpm install
```

## Everyday commands

| Command                                    | Purpose                                                              |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `pnpm run dev:docs`                        | Rspress documentation site (live React examples)                     |
| `pnpm run dev:playground:<framework>`      | Storybook for one adapter playground                                 |
| `pnpm run build`                           | Build every workspace package through Turborepo                      |
| `pnpm run test`                            | Run all package tests                                                |
| `pnpm run fmt:fix` / `pnpm run lint:check` | Format (oxfmt) and lint (oxlint)                                     |
| `pnpm run tsc:check`                       | Typecheck every package                                              |
| `pnpm run build:registry`                  | Regenerate the hosted shadcn registry artifacts                      |
| `pnpm run check:packages`                  | `publint` and `@arethetypeswrong` validation for all public packages |

## Before opening a pull request

1. Run the required validation from the repository root: `fmt:fix`, `lint:check`, `tsc:check`.
   CI runs the same checks plus docs, registry, Storybook, and package-contract builds.
2. Add a changeset for any consumer-facing change:

   ```bash
   pnpm run changeset
   ```

   Dependency-update pull requests (for example from Dependabot) should get a changeset too;
   pick the change type that matches the dependency impact.

3. Keep the multi-adapter contract synchronized. A public component change must reach every
   shipped counterpart (React, Solid, CSS Modules, Tailwind): implementation, tests, playground
   story, package `exports` entry, registry item, and component-local docs.
4. If any registry source file changed, run `pnpm run build:registry` and commit the regenerated
   artifacts under `website/docs/public/r`. Never edit those files by hand.
5. Documentation changes must keep the en, fr, and ru locales page-complete; do not add a page to
   localized navigation before its translation exists.

## Releases

Releases are automated with [Changesets](https://changesets.dev). When a pull request with
changesets merges to `main`, a "Version Packages" PR is created; merging it publishes the packages.
Publishing authenticates through npm [trusted publishing](https://docs.npmjs.com/trusted-publishers):
every published package lists this repository and workflow as a trusted publisher, and the release
workflow attaches a provenance attestation. No npm token is stored in the repository.

## Reporting issues

Use the issue templates for bug reports and component proposals. Security reports go through
[SECURITY.md](./SECURITY.md) and GitHub private vulnerability reporting, never public issues.

By participating you agree to the [Code of Conduct](./CODE_OF_CONDUCT.md).