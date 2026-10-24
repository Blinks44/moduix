# Card

## Upstream reference

Ark UI has no dedicated Card primitive. Moduix builds the parts with the
[Ark factory](https://ark-ui.com/docs/guides/composition) and follows the anatomy of
[Chakra Card](https://chakra-ui.com/docs/components/card) and
[shadcn Card](https://ui.shadcn.com/docs/components/card) (`CardContent` is `CardBody` here).

## Purpose

`Card` is a presentational surface for grouped content. It owns no state, context, or behavior.

## Public contract

- Flat parts: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardBody`,
  `CardFooter`, `CardMedia`, `CardBackground`, and `CardLink`.
- `Card` accepts `size` (`sm`, `md` default, `lg`) and `variant` (`elevated`, `outline` default,
  `subtle`). `data-size` and `data-variant` are always written.
- `CardTitle` renders `h3`, `CardDescription` renders `p`, `CardLink` renders `a`; the other parts
  render `div`. Every part supports Ark `asChild` and forwards its ref.
- Every part writes `data-scope="card"`, `data-part`, and `data-slot="card-<part>"` after consumer
  props, so the hooks cannot be overridden.
- `CardRootProps`, `CardSize`, and `CardVariant` are exported types.

## Layout

- `CardHeader`, `CardBody`, and `CardFooter` share one inset: each has it on the top and the sides,
  and the last section also has it at the bottom. Any combination of sections, and sections wrapped
  in a consumer element (horizontal cards), get even spacing without extra rules.
- `CardAction` sits in an implicit second header column next to the title and description.
- `CardMedia` is leading edge-to-edge media with rounded top corners.
- `CardBackground` is a decorative full-card layer (`z-index: -1` inside an isolated root).
  Overlays and text contrast stay consumer-owned; use an empty `alt`.
- `CardLink` is the stretched-link pattern: its `::after` covers the card, and nested interactive
  controls are lifted above it. Use `Card asChild` with an anchor when the whole card is one link and
  has no nested controls.

## Styling

CSS Modules expose 7 `--moduix-card-*` variables listed in
`packages/foundation/src/styles/variables-moduix.css`: `bg`, `color`, `border-color`,
`border-width`, `shadow`, `radius`, and `spacing`. They override every variant; a variant is themed
app-wide by setting them on `[data-slot='card-root'][data-variant='<variant>']`. Size and variant
values live in private `--_card-*` properties. Part typography, gaps, and focus rings use foundation
tokens directly; override them with a class on the part.

Tailwind packages size the inset with a private `--card-spacing` set on the root, and the title with
`group-data-[size]/card` utilities. Override the last section's bottom inset with `last:pb-*`.

## Preservation notes

- Keep the distinction between `Card asChild` (single-link card) and `CardLink` (card with nested
  actions).
- Keep `CardMedia` and `CardBackground` as narrow layout helpers; do not add image props to the root.
- Direct child margins inside `CardBody` stay consumer-owned.