---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Card: Replace the 48 `--moduix-card-*` variables with 7: `bg`, `color`, `border-color`, `border-width`, `shadow`, `radius`, and `spacing`. To theme one variant, set them on `[data-slot='card-root'][data-variant='<variant>']`. Per-variant, per-size, part typography, gap, and focus-ring variables are removed; override those with a class on the part.
Sections now share one inset: each `CardHeader`, `CardBody`, and `CardFooter` is padded on top and the last one at the bottom. A header-only card is no longer missing its bottom padding, and a header followed by a footer is no longer glued to it. The gap between header and body grows from 16px to the card inset (24px at `md`), like Chakra and shadcn.
`CardBody` text now uses the card foreground color instead of the muted color.
Fix `CardLink` with `CardBackground`: the link now covers the body and footer instead of only the header.
Export the `CardRootProps`, `CardSize`, and `CardVariant` types.