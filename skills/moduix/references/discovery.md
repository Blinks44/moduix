# moduix discovery

## Start with public documentation

- Use `https://moduix.dev/llms.txt` to discover components, recipes, themes, and guides.
- Read `https://moduix.dev/docs/<slug>.md` before implementing a focused component or workflow.
- Use the component page to confirm its API, framework examples, styling track availability, and
  required composition.

## Select the matching registry

| Runtime | Styling     | Namespace                | Catalogue                                           |
| ------- | ----------- | ------------------------ | --------------------------------------------------- |
| React   | CSS Modules | `@moduix-react`          | `https://moduix.dev/r/react/registry.json`          |
| Solid   | CSS Modules | `@moduix-solid`          | `https://moduix.dev/r/solid/registry.json`          |
| React   | Tailwind    | `@moduix-react-tailwind` | `https://moduix.dev/r/react-tailwind/registry.json` |
| Solid   | Tailwind    | `@moduix-solid-tailwind` | `https://moduix.dev/r/solid-tailwind/registry.json` |

Inspect `https://moduix.dev/r/<track>/<item>.json` when the raw registry item is useful. Do not
silently fall back to a different framework or styling track when an item is unavailable.

## Discover copy-owned items safely

1. Confirm the selected namespace and aliases with `shadcn@latest info --json`.
2. Search by user-facing behavior with
   `shadcn@latest search <namespace> --query "<product need>"`.
3. Inspect the exact item with `shadcn@latest view <namespace>/<item>`.
4. Use the docs to find recipes, then install the registry components they name. Recipes are not
   registry items.

Use the configured shadcn MCP server for the same discovery flow when it is available; otherwise use
the project's package runner and CLI.