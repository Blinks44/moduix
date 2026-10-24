# Badge

## Upstream reference

Ark UI has no dedicated Badge primitive. Moduix uses the
[Ark factory](https://ark-ui.com/docs/guides/composition), with visual direction from
[Chakra Badge](https://chakra-ui.com/docs/components/badge) and
[shadcn Badge](https://ui.shadcn.com/docs/components/badge).

## Purpose

`Badge` is a compact presentational label for status, category, version, or a small count.

## Public contract

- `Badge` is the root part with `default`, `secondary`, `destructive`, `outline`, `ghost`, and
  `link` variants and `sm`, `md` (default), and `lg` sizes. `data-variant` and `data-size` are always
  written. The `link` variant keeps its own height and inline padding at every size.
- `BadgeLabel` is an explicit text part for composed or truncatable labels.
- `BadgeDot` is an optional decorative part and always renders `aria-hidden="true"`.
- Every part exposes stable `data-scope`, `data-part`, and `data-slot` hooks and forwards its ref.
  The hooks are written after consumer props, so they cannot be overridden.
- `BadgeRootProps`, `BadgeSize`, and `BadgeVariant` are exported types.
- Direct text remains direct text; the component does not rewrite children or insert an implicit
  `BadgeLabel`.

## Preservation notes

- Keep Badge presentational: it owns no state, disabled model, or button behavior.
- Preserve semantic root composition through Ark factory `asChild`.
- Use `BadgeLabel` explicitly when a constrained composed label must ellipsize.
- Direct child SVG icons are the one normalized child contract: they are 12px unless a class on the
  icon sets another size, do not shrink, and do not receive pointer events.

## Styling and accessibility

Focusable composed hosts receive the root focus treatment. Anchor roots also receive the Badge
cursor and variant hover treatment; hover applies only under `@media (hover: hover)`. Buttons and
custom interactive roles retain their native semantics, while their hover, disabled, and
action-specific presentation remains consumer-owned.

CSS Modules expose 3 `--moduix-badge-*` variables listed in
`packages/foundation/src/styles/variables-moduix.css`: `bg`, `border-color`, and `color` override any
variant, including the anchor hover colors, and a variant is themed app-wide by setting them on
`[data-slot='badge-root'][data-variant='<variant>']`. Size, spacing, typography, radius, icon and dot
size, focus ring, transition, and hover use foundation tokens directly; a consumer class on the part
overrides them because component styles live in the `moduix.components` layer. The filled-variant
anchor hover reads `--moduix-opacity-hover`, exposed to Tailwind as `opacity-hover`. Tailwind variants
use utilities and consumer class overrides instead.

## Differences from upstream

Moduix adds `BadgeLabel`, `BadgeDot`, stable Ark-style hooks, sizes, and a `link` visual variant while
keeping the root composition explicit.