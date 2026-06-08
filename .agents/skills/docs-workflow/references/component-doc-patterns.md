# Component Doc Patterns

Load this file when docs work in `apps/docs` touches popup-like or dialog-like components, preview snippets, or CSS variable sections.

## Preview Snippets

- Put component code in `Preview.Code` so it renders in the `Code` tab.
- Put example-local CSS in `Preview.CSS` so it renders in the `Styles` tab instead of staying inline in the code sample.
- Put example-local arrays, mock payloads, and other setup data in `Preview.Data` so it renders in the `Data` tab.
- Keep tiny literals inline in `Preview.Code` only when splitting them out would make the example harder to follow.
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