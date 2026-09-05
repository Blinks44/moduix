# AGENTS.md

You are an expert in JavaScript, Rspack, Rsbuild, Rslib, and library development. You write maintainable, performant, and accessible code.

## Commands

- `pnpm --filter @moduix/react build` - Build the library for production
- `pnpm --filter @moduix/react dev` - Turn on watch mode, watch for changes and rebuild the library
- `pnpm --filter @moduix/react test` - Run tests
- `pnpm --filter @moduix/react test:watch` - Run tests in watch mode

## Docs

- Rslib: https://rslib.rs/llms.txt
- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt
- Rstest: https://rstest.rs/llms.txt

## Tools

### Storybook

- Stories live in `playgrounds/react/stories` and `playgrounds/solid/stories`.
- Run `pnpm run dev:playgrounds` from the repository root to start both playgrounds.
- Run `pnpm --filter @moduix/playground-react build:storybook` or
  `pnpm --filter @moduix/playground-solid build:storybook` to build a playground.