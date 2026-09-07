# Badge

## Upstream reference

Ark UI has no dedicated Badge primitive. Moduix uses the
[Ark factory](https://ark-ui.com/docs/guides/composition), with visual direction from
[Chakra Badge](https://chakra-ui.com/docs/components/badge) and
[shadcn Badge](https://ui.shadcn.com/docs/components/badge).

## Purpose

`Badge` is a compact presentational label for status, category, version, or a small count.

## Public contract

- `Badge` and `Badge.Root` expose the same root part with `default`, `secondary`, `destructive`,
  `outline`, `ghost`, and `link` variants.
- `Badge.Label` is an explicit text part for composed or truncatable labels.
- `Badge.Dot` is an optional decorative part and always renders `aria-hidden="true"`.
- Every part exposes stable `data-scope`, `data-part`, and `data-slot` hooks and forwards its ref.
- Direct text remains direct text; the component does not rewrite children or insert an implicit
  `Badge.Label`.

## Preservation notes

- Keep Badge presentational: it owns no state, disabled model, or button behavior.
- Preserve semantic root composition through Ark factory `asChild`.
- Use `Badge.Label` explicitly when a constrained composed label must ellipsize.
- Direct child SVG icons are the one normalized child contract: they inherit `currentColor`, use
  the public icon-size variable, and do not receive pointer events.

## Styling and accessibility

Focusable composed hosts receive the root focus treatment. Anchor roots also receive the Badge
cursor and variant hover treatment. Buttons and custom interactive roles retain their native
semantics, while their hover, disabled, and action-specific presentation remains consumer-owned.

CSS Modules expose the component's `--moduix-badge-*` variables listed in
`packages/foundation/src/styles/variables-moduix.css`. Tailwind variants use utilities and consumer
class overrides instead.

## Differences from upstream

Moduix adds `Badge.Label`, `Badge.Dot`, stable Ark-style hooks, and a `link` visual variant while
keeping the root composition explicit.

## Local changelog

- 2026-09-07: Removed implicit text wrapping and button-specific hover/disabled styling; labels are
  now explicit and interactive presentation is limited to focus plus anchor hover behavior.