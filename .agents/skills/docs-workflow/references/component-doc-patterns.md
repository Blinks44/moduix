# Component Doc Patterns

Load this file when docs work in `apps/docs` touches component pages, preview snippets, or CSS variable sections.

Reference implementation for the current standard component-page shape:

- `apps/docs/content/docs/select.mdx`

## Standard Page Structure

Use this section order when the sections carry real value:

1. `## API Reference`
2. `## Choosing the right component` (optional)
3. `## Basic`
4. `## Install with shadcn (optional)`
5. `## Anatomy`
6. `## Composition`
7. `## Examples`
8. `## Styling` (optional)

Inside `## Composition`, use:

1. `### Recommended composition`
2. `### When to go custom`
3. `### Default props` (optional)
4. `### Behavioral notes` (optional)

Inside `## Styling`, use:

1. `### CSS Properties` (optional)
2. `### Styling hooks` (optional)

## Section Intent

- `API Reference`: one short upstream reference block, no extra prose.
- `Choosing the right component`: only for components with close alternatives.
- `Basic`: the recommended happy path and the first runnable example.
- `Install with shadcn`: comes immediately after `Basic`.
- `Anatomy`: structure only. Keep it short: ASCII tree plus concise part roles.
- `Composition`: public contract, recommended part tree, escape hatches, defaults, and behavioral constraints.
- `Examples`: start where `Basic` stops. Move into narrower, more specific, or more advanced cases.
- `Styling`: only when the component has a meaningful styling contract.

## Duplication Rules

- Rename old `Default Path` sections to `Basic`.
- Do not duplicate the `Basic` example in `Anatomy` as a full code block unless the structure would otherwise be unclear.
- Do not put runnable snippets in `Composition` when the same case is already covered in `Examples`.
- Use `Custom Composition` only as an example label inside `Examples` when a low-level escape hatch is worth showing.
- If an example is named `Custom Composition`, it must show the real low-level composition path rather than only styling a high-level sugar wrapper.
- Use `Custom Styling` when the example is only about `className`, local CSS overrides, `--component-*`
  variables, or targeting public slots/state attributes without changing the rendered structure.
- If a component has no meaningful composition escape hatch beyond its normal public path, prefer
  `Custom Styling` and do not add a placeholder `Custom Composition` example.

## Preview Rules

- Put component code in `Preview.Code`.
- Put example-local CSS in `Preview.CSS`.
- Put arrays, mock payloads, and other setup data in `Preview.Data`.
- Keep snippets self-contained and consumer-facing.
- Do not repeat global setup imports.
- Do not attach `Preview.CSSProperties` or `Preview.CSSPlayground` to the `Basic` example.
- Prefer removing `Playground` from component pages unless a task explicitly needs interactive token editing.
- Do not add a preview canvas inside `Styling`.

## CSS Properties

- In `### CSS Properties`, prefer the direct CSS variables reference UI over a duplicated prose table.
- If the reference UI is long, wrap it in docs `Tabs` with a `CSS Variables` tab and a bounded scroll area.
- `CSS Properties` must cover the full public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.
- `Styling hooks` should cover meaningful `className`, `data-slot`, and state/data attributes consumers can actually target.

## Family Notes

Popup-like components:

- Teach the explicit Ark/Chakra part tree as the default contract.
- Treat built-in popup arrows as opt-in unless the component contract explicitly says otherwise.
- Keep structural parts visible in docs examples instead of hiding them behind `*Content` sugar.

Dialog-like components:

- Teach the explicit Ark/Chakra part tree as the default contract.
- Do not teach popup positioning or arrow props.
- Keep workflow sugar narrow and family-specific.