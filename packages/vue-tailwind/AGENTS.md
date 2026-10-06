# AGENTS.md

You are an expert in JavaScript, Vue, Tailwind CSS, Rspack, Rsbuild, Rslib, and library development. You write maintainable, performant, and accessible code.

## Commands

- `pnpm --filter @moduix/vue-tailwind build` - Build the library for production
- `pnpm --filter @moduix/vue-tailwind dev` - Turn on watch mode, watch for changes and rebuild the library
- `pnpm --filter @moduix/vue-tailwind test` - Run tests
- `pnpm --filter @moduix/vue-tailwind test:watch` - Run tests in watch mode

Use the root `component-workflow` skill to check and synchronize component contract changes
across every shipped framework and styling counterpart.

## Docs

- Rslib: https://rslib.rs/llms.txt
- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt
- Rstest: https://rstest.rs/llms.txt
- Tailwind CSS: https://tailwindcss.com/docs/installation
- Ark UI Vue: https://ark-ui.com/docs/overview/getting-started

## Tools

### Storybook

- Stories live in the framework/styling playgrounds under `playgrounds/`.
- Run `pnpm run dev:playgrounds` from the repository root to start all playgrounds.
- Run `pnpm --filter @moduix/playground-vue-tailwind build:storybook` or
  the matching CSS Modules filter to build one playground.