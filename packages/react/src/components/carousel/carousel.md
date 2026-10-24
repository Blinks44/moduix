# Carousel

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/carousel
- Chakra UI: https://chakra-ui.com/docs/components/carousel

## Purpose

`Carousel` is the moduix wrapper around Ark UI Carousel. It keeps Ark paging, autoplay, drag,
provider, and context behavior unchanged and adds styled parts, a few CSS variables, and stable
`data-slot` hooks.

## Current behavior contract

- Flat public API: `Carousel`, `CarouselRootProvider`, `CarouselContext`, `CarouselControl`,
  `CarouselItemGroup`, `CarouselItem`, `CarouselPrevTrigger`, `CarouselNextTrigger`,
  `CarouselIndicatorGroup`, `CarouselIndicator`, `CarouselIndicators`, `CarouselAutoplayTrigger`,
  `CarouselAutoplayIndicator`, `CarouselProgressText`, `useCarousel`, and `useCarouselContext`.
  Ark types stay available from `@ark-ui/react/carousel`.
- Every part is a thin Ark wrapper: class merge, `data-slot` after the props spread, ref forwarding,
  and `asChild`. No Ark defaults are changed.
- `CarouselControl` is a flex toolbar, not overlay chrome. It centers its content horizontally and
  spreads it with `space-between` vertically. The recommended layout keeps `CarouselItemGroup` as its
  sibling; placing the item group inside `CarouselControl` is supported for compact inline layouts.
- `CarouselPrevTrigger` and `CarouselNextTrigger` render moduix chevrons when they have no children.
  The default chevrons turn to up and down in vertical carousels and mirror when the root has
  `dir="rtl"`. Custom children are never rotated.
- `CarouselAutoplayTrigger` shares the trigger styles but grows with its label.
- `CarouselIndicators` is the only sugar: it renders one `CarouselIndicator` per
  `api.pageSnapPoints` entry. `className` styles the group, `indicatorClassName` styles each
  generated indicator. For custom pagers render `CarouselIndicatorGroup` and `CarouselIndicator`
  inside `CarouselContext`.
- `CarouselProgressText` keeps `current / total` left-to-right inside RTL carousels.
- Put the accessible name on `Carousel` or `CarouselRootProvider`. `CarouselItemGroup` is a generic
  element, so an `aria-label` there is not announced.

## Styling

Parts live in `@layer moduix.components`, so a plain class on any part overrides them. Public
variables are kept for values people retheme as a set:

| Variable                                 | Default                          | Notes                              |
| ---------------------------------------- | -------------------------------- | ---------------------------------- |
| `--moduix-carousel-gap`                  | `var(--moduix-spacing-3)`        | Gap between root and control parts |
| `--moduix-carousel-height`               | `24rem`                          | Vertical root height only          |
| `--moduix-carousel-control-size`         | `var(--moduix-size-md)`          | Trigger size                       |
| `--moduix-carousel-control-bg`           | `var(--moduix-color-card)`       | Trigger background                 |
| `--moduix-carousel-control-border-color` | `var(--moduix-color-border)`     | Trigger border                     |
| `--moduix-carousel-control-color`        | `var(--moduix-color-foreground)` | Trigger icon and text              |
| `--moduix-carousel-indicator-size`       | `var(--moduix-spacing-2)`        | Dot size; current is 3x longer     |
| `--moduix-carousel-indicator-bg`         | `muted-foreground` at 50%        | Idle indicator                     |
| `--moduix-carousel-indicator-bg-current` | `var(--moduix-color-primary)`    | Current indicator                  |

Hover styles apply only on devices with hover. Forced-colors mode keeps idle and current indicators
distinguishable, and reduced motion turns off trigger and indicator transitions. Ark scrolls pages
with an explicit `behavior: 'smooth'`, so the wrapper cannot make paging instant under reduced
motion.

Ark sets the item group `display`, overflow, scroll snapping, and scrollbar hiding inline; the
wrapper does not repeat them.

## Agent notes

- Keep Ark callback and state shapes untouched, especially `onPageChange(details)`.
- Do not add broader convenience wrappers than `CarouselIndicators`.
- Ark reads direction from `LocaleProvider`. A `dir` prop on `Carousel` only sets the root
  attribute; the default chevrons follow that attribute.