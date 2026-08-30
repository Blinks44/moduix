# moduix discovery

## Start with public context

- Use `https://moduix.dev/llms.txt` to discover components, themes, recipes, and guides.
- Read `https://moduix.dev/docs/<slug>.md` before implementing a focused component or workflow.
- Use `https://moduix.dev/r/react/registry.json` to inspect the copy-owned registry catalogue and
  `https://moduix.dev/r/react/<item>.json` to inspect one item.

## Choose an existing building block first

1. Search the component gallery for the user-facing behavior, not only a familiar library name.
2. Look in Recipes before composing a repeated application flow from primitives.
3. Use the documented component API when it fits. Ask before introducing a new primitive or changing
   the ownership model.

## Copy-owned discovery

Confirm the configured `@moduix-react` namespace with `shadcn@latest info --json`. Then use the
project runner with `shadcn@latest search @moduix-react --query "<product need>"` to find items and
`shadcn@latest view @moduix-react/<item>` to inspect one before adding it. Search the component and
theme catalogue by user-facing behavior. Use the docs to find recipes, then install the registry
components they name. Prefer the configured shadcn MCP server when it is available; otherwise
follow the same CLI workflow.