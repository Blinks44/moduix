# AGENTS.md

You are an expert in JavaScript, Vue, Rspack, Rsbuild, Rslib, and library development. You write maintainable, performant, and accessible code.

## Commands

- `pnpm --filter @moduix/vue build` - Build the library for production
- `pnpm --filter @moduix/vue dev` - Turn on watch mode, watch for changes and rebuild the library
- `pnpm --filter @moduix/vue test` - Run tests
- `pnpm --filter @moduix/vue test:watch` - Run tests in watch mode

Component contract changes must be ported against the shipped React and Solid counterparts in
`packages/react`, `packages/solid`, `packages/react-tailwind`, and `packages/solid-tailwind`
through the root `component-workflow` skill.

## Docs

- Rslib: https://rslib.rs/llms.txt
- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt
- Rstest: https://rstest.rs/llms.txt
- Ark UI Vue: https://ark-ui.com/docs/overview/getting-started

## Tools

### Storybook

- Stories live in the framework/styling playgrounds under `playgrounds/`.
- Run `pnpm run dev:playgrounds` from the repository root to start all playgrounds.
- Run `pnpm --filter @moduix/playground-vue build:storybook` or
  the matching Tailwind filter to build one playground.