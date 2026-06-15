# Component Doc Patterns

Load this file when docs work in `apps/docs` touches popup-like or dialog-like components, preview snippets, or CSS variable sections.

Reference implementation for the current standard component page shape:

- `apps/docs/content/docs/select.mdx`

## Component Page Structure

Use this standard section order for component pages:

1. `## API Reference`
2. `## Choosing the right component` (optional)
3. `## Basic`
4. `## Install with shadcn (optional)`
5. `## Anatomy`
6. `## Composition`
7. `## Examples`
8. `## Styling` (optional)

Within `## Composition`, use this subsection order when relevant:

1. `### When to stay high-level`
2. `### When to go custom`
3. `### Default props` (optional)
4. `### Behavioral notes` (optional)

Within `## Styling`, use this subsection order when relevant:

1. `### CSS Properties` (optional)
2. `### Styling hooks` (optional)

Interpretation rules:

- `API Reference` is a short upstream reference block only.
- `Choosing the right component` is only for components with nearby alternatives.
- `Basic` is the recommended default path and should be the first runnable example.
- `Install with shadcn (optional)` comes immediately after `Basic`.
- `Anatomy` explains structure, not behavior.
- Do not duplicate the `Basic` example in `Anatomy` as a full code block unless the structure would otherwise be unclear.
- `Composition` explains the public contract, high-level path, escape hatches, default props, and important behavioral constraints.
- `Examples` should start where `Basic` stops. Do not repeat the same example there.
- `Styling` exists only when the component has a meaningful styling contract.

## Preview Snippets

- Put component code in `Preview.Code` so it renders in the `Code` tab.
- Put example-local CSS in `Preview.CSS` so it renders in the `Styles` tab instead of staying inline in the code sample.
- Put example-local arrays, mock payloads, and other setup data in `Preview.Data` so it renders in the `Data` tab.
- Keep tiny literals inline in `Preview.Code` only when splitting them out would make the example harder to follow.
- Keep snippets self-contained and consumer-facing.
- Do not repeat global setup imports.
- Do not attach `Preview.CSSProperties` or `Preview.CSSPlayground` to the `Basic` example.
- Prefer removing `Playground` from component pages unless the task explicitly calls for interactive token editing.
- Do not add a preview canvas in `Styling`.
- In `### CSS Properties`, prefer the direct CSS variables reference UI over a duplicated summary table.

## Popup-like Components

- Teach shared `*Content` sugar only when those props are actually supported.
- Treat built-in popup arrows as opt-in unless the component contract explicitly says otherwise.
- Keep custom arrow, portal, backdrop, and viewport composition in an explicit advanced section.

## Dialog-like Components

- Do not teach popup positioning or arrow props.
- Keep workflow sugar narrow and family-specific.

## CSS Variable Docs

- `CSS Properties` must cover the full public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.
- `CSS Playground` is an exception path, not the default. Only keep it when a task explicitly calls for interactive token editing and the control surface is genuinely useful.
- `Styling hooks` should cover meaningful `className`, `data-slot`, and state/data attributes that consumers can actually target.