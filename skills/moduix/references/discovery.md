# moduix discovery

## Start with public context

- Use `https://moduix.dev/llms.txt` to discover components, blocks, themes, and guides.
- Read `https://moduix.dev/docs/<slug>.md` before implementing a focused component or workflow.
- Use `https://moduix.dev/r/react/<item>.json` only to inspect a copy-owned registry item.

## Choose an existing building block first

1. Search the component gallery for the user-facing behavior, not only a familiar library name.
2. Look in Blocks before composing a repeated application flow from primitives.
3. Use the documented component API when it fits. Ask before introducing a new primitive or changing
   the ownership model.

## Copy-owned discovery

With the configured project runner, use `shadcn@latest search @moduix-react -q "<query>"` to find
items and `shadcn@latest view @moduix-react/<item>` to inspect one before adding it. Prefer the
configured shadcn MCP server when it is available.