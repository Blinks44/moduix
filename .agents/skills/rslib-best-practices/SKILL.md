---
name: rslib-best-practices
description: Rslib best practices for config, CLI workflow, output, declaration files, dependency handling, build optimization and toolchain integration. Use when writing, reviewing, or troubleshooting Rslib projects.
---

# Rslib Best Practices

Apply these rules when writing or reviewing Rslib library projects.

## Configuration

- Use `rslib.config.ts` and `defineConfig`
- Check Rslib-specific configurations first (e.g., `lib.*`), and also leverage Rsbuild configurations (e.g., `source.*`, `output.*`, `tools.*`) as needed
- For deep-level or advanced configuration needs, use `tools.rspack` or `tools.bundlerChain` to access Rspack's native configurations
- In TypeScript projects, prefer `tsconfig.json` path aliases

## CLI

- Use `rslib` to build
- Use `rslib --watch` to build in watch mode for local development
- Use `rslib inspect` to inspect final Rslib/Rsbuild/Rspack configs

### moduix docs integration

- For docs development, use the root `npm run dev:docs` workflow rather than an independent Rslib command; it owns the `rslib --watch --no-clean` watcher.
- Treat `--no-clean` as development-only. Release, CI, `npm pack`, and final package checks use clean package builds.
- Do not run a clean package build or `build:docs` while `dev:docs` is active; follow `docs-workflow` for the complete docs-development constraints.

## Output

- Prefer to build pure-ESM package with `"type": "module"` in `../../../package.json`
- Prefer to use bundleless mode with `output.target` set to `'web'` when building component libraries
- Prefer to use bundle mode when building Node.js utility libraries
- Ensure `exports` field in `../../../package.json` is correctly configured and matches the actual JavaScript output and declaration files output of different formats (ESM, CJS, etc.)
- Keep every shipped public adapter package in the root `build:packages` and `check:packages` commands.
- For Solid packages, preserve the established dual output: compiled ESM for general bundlers and
  `.jsx` under the `solid` export condition for Solid-aware SSR. Give Rslib outputs stable ids and
  point Rstest at the compiled id; do not invent a custom transform pipeline.
- For Vue packages, use the Vue plugin to compile authored `.vue` SFCs to ESM for npm consumers and
  emit declarations that preserve `.vue.d.ts` filenames and barrel references. Keep source `.vue`
  files in registry artifacts rather than making npm consumers compile package internals. Verify a
  clean build, the package `files` and `exports` maps, emitted import specifiers, and a consumer type
  fixture before treating the package as publishable.

## Declaration files

- Prefer to enable declaration file generation with `lib.dts: true` or detailed configurations
- For faster type generation, enable the experimental `lib.dts.tsgo` path only in packages whose
  framework declaration tooling supports the native TypeScript build. Do not enable it for the Vue
  packages while their `vue-tsc` and SFC declaration pipeline require JavaScript TypeScript.

## Dependencies

- Prefer to place dependencies to be bundled in `devDependencies` in bundle mode and dependencies in `dependencies` and `peerDependencies` will be automatically externalized (not bundled) by default
- Verify the build output and dependency specifiers in `../../../package.json` carefully to ensure no missing dependency errors occur when consumers install and use this package

## Build optimization

- Keep syntax target in `lib.syntax` aligned with real compatibility requirements to enable better optimizations
- Avoid format-specific APIs in source code for better compatibility with different output formats
- Prefer lightweight dependencies to reduce bundle size

## Toolchain integration

- Prefer to use Rstest with `@rstest/adapter-rslib` for writing tests
- Prefer to use Rspress for writing library documentation, with `@rspress/plugin-preview` and `@rspress/plugin-api-docgen` for component previews and API docs

## Debugging

- Run with `DEBUG=rsbuild` when diagnosing config resolution or plugin behavior
- Read generated files in `dist/.rsbuild` to confirm final Rsbuild/Rspack config, not assumed config

## Documentation

- For the latest Rslib docs, read https://rslib.rs/llms.txt