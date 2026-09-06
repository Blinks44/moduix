# AGENTS.md

You are an expert in JavaScript, Rspack, Rsbuild, Rslib, and library development. You write maintainable, performant, and accessible code.

## Commands

- `pnpm --filter @moduix/react build` - Build the library for production
- `pnpm --filter @moduix/react dev` - Turn on watch mode, watch for changes and rebuild the library
- `pnpm --filter @moduix/react test` - Run tests
- `pnpm --filter @moduix/react test:watch` - Run tests in watch mode

Component contract changes must also be checked against existing counterparts in `packages/solid`,
`packages/react-tailwind`, and `packages/solid-tailwind` through the root `component-workflow` skill.

## Docs

- Rslib: https://rslib.rs/llms.txt
- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt
- Rstest: https://rstest.rs/llms.txt

## Tools

### Storybook

- Stories live in the four framework/styling playgrounds under `playgrounds/`.
- Run `pnpm run dev:playgrounds` from the repository root to start all playgrounds.
- Run `pnpm --filter @moduix/playground-react build:storybook` or
  the matching Solid or Tailwind filter to build one playground.