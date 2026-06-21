# moduix docs

`apps/docs` is the documentation site for the `moduix` UI component library from `packages/react`.

It contains user-facing guides, component pages, usage examples, and API references.

Key docs that currently require extra synchronization with library behavior:

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

Before working on docs, build the React package from the monorepo root so docs use fresh library output:

```bash
npm run build:react
```

Then run docs:

```bash
npm --workspace moduix-docs run dev
```