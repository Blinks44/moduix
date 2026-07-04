# moduix docs

`apps/docs` is the documentation site for the `moduix` component system. Today it primarily
documents the shipped `packages/react` package and its registry install flow.

It contains user-facing guides, component pages, usage examples, install guidance, and API
references for the current shipped library.

Keep these pages synchronized with package behavior whenever install flow, composition guidance,
or styling tokens change:

- `content/docs/quick-start.mdx` for package install and `shadcn` registry setup
- `content/docs/composition-patterns.mdx` for wrapper composition guidance
- `content/docs/tokens.mdx` for shared token entrypoints and override scope

## Tech stack

- TanStack Start
- Fumadocs + MDX content
- React + TypeScript

## Project structure

```text
apps/docs/
  content/docs/     # MDX documentation pages
  src/components/   # Site and live preview components
  src/routes/       # Application routes
```

## Development

Before validating docs that depend on React package output, build the package from the monorepo root
so docs use fresh declarations and compiled files:

```bash
npm run build:react
```

Use the already running project server during agent work. Start the docs server only when explicitly
asked to run it:

```bash
npm --workspace moduix-docs run dev
```