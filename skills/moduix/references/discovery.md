# moduix discovery

## Start with public documentation

- Use `https://moduix.dev/llms.txt` for the site index, or fetch the framework-scoped bundle for
  focused context:
  - `https://moduix.dev/llms-react.txt`
  - `https://moduix.dev/llms-solid.txt`
  - `https://moduix.dev/llms-vue.txt`
  - `https://moduix.dev/llms-svelte.txt`
- Read `https://moduix.dev/docs/<slug>.md` before implementing a focused component or workflow.
- Use the component page to confirm its API, shipped framework examples, styling track availability, and
  required composition.

## Select the matching registry

| Runtime | Styling     | Namespace                 | One-step init                                    | Catalogue                                            |
| ------- | ----------- | ------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| React   | CSS Modules | `@moduix-react`           | `https://moduix.dev/r/react/init.json`           | `https://moduix.dev/r/react/registry.json`           |
| React   | Tailwind    | `@moduix-react-tailwind`  | `https://moduix.dev/r/react-tailwind/init.json`  | `https://moduix.dev/r/react-tailwind/registry.json`  |
| Solid   | CSS Modules | `@moduix-solid`           | `https://moduix.dev/r/solid/init.json`           | `https://moduix.dev/r/solid/registry.json`           |
| Solid   | Tailwind    | `@moduix-solid-tailwind`  | `https://moduix.dev/r/solid-tailwind/init.json`  | `https://moduix.dev/r/solid-tailwind/registry.json`  |
| Vue     | CSS Modules | `@moduix-vue`             | `https://moduix.dev/r/vue/init.json`             | `https://moduix.dev/r/vue/registry.json`             |
| Vue     | Tailwind    | `@moduix-vue-tailwind`    | `https://moduix.dev/r/vue-tailwind/init.json`    | `https://moduix.dev/r/vue-tailwind/registry.json`    |
| Svelte  | CSS Modules | `@moduix-svelte`          | `https://moduix.dev/r/svelte/init.json`          | `https://moduix.dev/r/svelte/registry.json`          |
| Svelte  | Tailwind    | `@moduix-svelte-tailwind` | `https://moduix.dev/r/svelte-tailwind/init.json` | `https://moduix.dev/r/svelte-tailwind/registry.json` |

Inspect `https://moduix.dev/r/<track>/<item>.json` when the raw registry item is useful. Do not
silently fall back to a different framework or styling track when an item is unavailable.

## Discover registry items safely

1. For an uninitialized project, run `shadcn@latest init https://moduix.dev/r/<track>/init.json`
   with the project's package runner.
2. Confirm the selected namespace and aliases with `shadcn@latest info --json`.
3. Search by user-facing behavior with
   `shadcn@latest search <namespace> --query "<product need>"`.
4. Inspect the exact item with `shadcn@latest view <namespace>/<item>`.
5. Blocks are registry items in the same namespace, such as `<namespace>/login-simple`. Locale and
   accessibility label providers install via `<namespace>/locale`.

Use the configured shadcn MCP server for the same discovery flow when it is available; otherwise use
the project's package runner and CLI.