# Component Doc Patterns

Load this file when docs work in `apps/docs` touches popup-like or dialog-like components, preview snippets, or CSS variable sections.

## Preview Snippets

- When a preview depends on local data, show that data in `Preview.Code` or `Preview.Data`.
- Keep snippets self-contained and consumer-facing.
- Do not repeat global setup imports.

## Popup-like Components

- Teach shared `*Content` sugar only when those props are actually supported.
- Treat built-in popup arrows as opt-in unless the component contract explicitly says otherwise.
- Keep custom arrow, portal, backdrop, and viewport composition in an explicit advanced section.

## Dialog-like Components

- Do not teach popup positioning or arrow props.
- Keep workflow sugar narrow and family-specific.

## CSS Variable Docs

- `CSS Properties` must cover the full public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.
- `CSS Playground` should expose only a safe, useful subset.