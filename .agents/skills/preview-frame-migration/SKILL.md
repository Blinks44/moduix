---
name: preview-frame-migration
description: Migrate or review Rspress live previews in apps/docs so PreviewFrame controls preview size and placement without leaking docs-only wrappers or fixed preview widths into consumer-facing TSX snippets. Use for moving existing component docs, removing preview layout hardcoding, standardizing auxiliary controls and result output, or diagnosing preview centering and width behavior.
---

# Preview Frame Migration

Use `PreviewFrame` only in MDX around an official `tsx preview` fence. It emits CSS variables into the documentation DOM; it never becomes part of the displayed or copied snippet.

## Contract

`PreviewFrame` is defined in `apps/docs/src/components/mdx/reference.tsx`, registered globally by the docs theme, and needs no MDX import.

````mdx
<PreviewFrame maxWidth="sm">
  ```tsx preview file="./_snippets/example/basic.tsx"
  ```

</PreviewFrame>
````

Use both sizing controls independently: `maxWidth` caps the root without making it grow, while
`contentWidth` chooses its docs-only inline-size behavior.

- `maxWidth="sm" | "lg"` — cap at 384px or 512px, respectively.
- `contentWidth="fit-content"` — shrink-wrap a root that otherwise declares `width: 100%`.

For a compact form primitive, combine them so it remains responsive while displaying at its natural width:

````mdx
<PreviewFrame contentWidth="fit-content" maxWidth="sm">
  ```tsx preview file="./_snippets/example/with-field.tsx"
  ```

</PreviewFrame>
````

- Omit `PreviewFrame` when the example should retain its natural size.
- Use `maxWidth="sm"` for a 384px ceiling and `maxWidth="lg"` for a 512px ceiling.
- Use `maxWidth="fit-content"` only when the content-fit maximum is intentional.
- Omit `maxWidth="fit-content"` for a direct snippet root that owns its own fixed or square inline size, such as an `Avatar`. Its `max-inline-size: fit-content` can distort the component; the default preview canvas already centers naturally sized content.
- Fixed presets resolve through `max-inline-size: min(<preset>, 100%)`; they do not set a fixed width and remain safe on narrow viewports.
- Use `contentWidth="fit-content"` together with a fixed preset only when a direct root intentionally defaults to `width: 100%`, but its natural content width is the appropriate preview shape (for example, `Field`, `Fieldset`, or a compact form). It shrink-wraps only the docs preview root; keep it off roots meant to fill their capped frame.
- The white preview card remains full-width. The limit applies only to the preview compiler's direct snippet root.

## Placement and inner layout

- Default preview placement is centered. Do not set `alignItems="stretch"` merely to make a child wider: a capped flex item can then start at the left edge.
- `alignItems` and `justifyContent` control the preview canvas. Use them only for a deliberate canvas-placement change.
- `childAlignItems` and `childJustifyContent` apply only when explicitly passed, and then only to the direct snippet root. Do not use them to reach through unknown component trees; the root may be a grid rather than a flex container. They must not override a demo root's own layout by default.
- A maximum does not make an intrinsically sized root grow. If a demo's own layout intentionally needs to fill the available frame (for example, a stack of equal-width alerts), give that demo root `inline-size: 100%`. Keep the numeric limit in `PreviewFrame`, not in the demo CSS.

## Auxiliary controls and result output

Keep controls that operate the demo and result feedback below the documented component, separated by a spacing token. Do not move controls that are part of the component's public anatomy (for example, `Alert.Actions`) outside that component.

- Use moduix `Button` for every interactive demo action. Do not add native `<button>` elements or link-shaped controls for actions.
- Render a value that changes as a result of an interaction, event, or calculation with native `<output>`, not a presentational `<span>`. Keep a static explanatory label as ordinary text only when it is not result feedback.
- Group the documented component, auxiliary actions, and output in one local vertical layout with a consistent gap. Keep the documented component first, then actions, then output.
- Use the shared docs preview treatment for native `<output>` instead of per-example `*-output`, `*-hint`, or status styles. It gives the readout a muted surface, subtle border, compact tokenized spacing, and long-value wrapping; do not override it unless the output is part of the documented component API.
- Keep output text short and labelled, for example `Selected: package.json` or `Submitted: saved`. Avoid adding `aria-live` unless the example specifically demonstrates announcement behavior; native `output` already conveys result semantics.

When the shared output treatment is introduced, migrate existing demo result spans and local output classes to it in a dedicated pass. Preserve styles that are part of an actual component API rather than docs feedback.

## Migration workflow

1. Find every `tsx preview` fence on the target MDX page and wrap each relevant one in `PreviewFrame`.
2. Move docs-only numeric width limits such as `max-width: 24rem`, `width: min(24rem, 100%)`, or preview wrapper components out of snippets and example CSS.
3. Preserve local layout that documents the example itself: grids, gaps, action layout, and a necessary `inline-size: 100%` fill rule. Remove an injected `<style>` block and its export when it became width-only.
4. Keep runnable TSX self-contained and consumer-facing. Never add `PreviewFrame`, `PreviewLayout`, or a docs-only wrapper to the snippet.
5. Keep the four-backtick closing fence and two-space indentation used by existing MDX wrappers, then run the repository's required docs validation from `AGENTS.md`.

## Troubleshooting

- A canvas is narrow but the example is left-aligned: remove an unintended `alignItems="start"` or `alignItems="stretch"` override before changing global CSS.
- A constrained `Field`, `Fieldset`, or form looks visually left-aligned even though its root is centered: its `width: 100%` root has filled the capped width while its own children correctly start at the left edge. Use `contentWidth="fit-content"` with the fixed `maxWidth`; do not center internal children or reintroduce a snippet class just for preview placement.
- A constrained example becomes narrower than its preset: that is normal for `max-inline-size`; add a local `inline-size: 100%` only if full-width content is part of the example's intended layout.
- A naturally sized component becomes distorted or an example stops honoring its own `align-items`: remove unnecessary `fit-content` or implicit child-layout overrides. The unwrapped preview defaults to centered placement and preserves the demo root's layout declarations.
- A size rule appears in copied code: move it to `PreviewFrame` or docs-only styling. The copied snippet must not expose documentation infrastructure.

## Lifetime

Treat this as a temporary migration skill. Remove `.agents/skills/preview-frame-migration/` after the documentation migration is complete.