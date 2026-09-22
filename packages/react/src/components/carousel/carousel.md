# Carousel

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/carousel
- Chakra UI: https://chakra-ui.com/docs/components/carousel

## Purpose

`Carousel` is the moduix wrapper around Ark UI Carousel for paged image tracks, multi-slide layouts,
variable-size items, autoplay, and provider-driven flows.

The wrapper keeps Ark paging and runtime state intact while adding moduix visual defaults, CSS
variables, and stable `data-slot` hooks.

## Upstream model to preserve

- Uses the Ark UI carousel primitive directly.
- Keeps Ark anatomy centered on the root, `RootProvider`, `Control`, `ItemGroup`, `Item`, triggers,
  indicators, and optional autoplay parts.
- Keeps Ark page control, provider/context flow, orientation handling, drag/autoplay state, and
  runtime API intact.

## Current behavior contract

- Uses the shared flat API: `Carousel`, `CarouselRootProvider`, `CarouselContext`, `CarouselControl`,
  `CarouselItemGroup`, `CarouselItem`, `CarouselPrevTrigger`, `CarouselNextTrigger`,
  `CarouselIndicatorGroup`, `CarouselIndicator`, `CarouselIndicators`, `CarouselAutoplayTrigger`,
  `CarouselAutoplayIndicator`, and `CarouselProgressText`.
- `Carousel` is the only public root value.
- `CarouselContext`, `useCarousel`, and `useCarouselContext` are exported from `@moduix/react`.
  Type aliases remain available from `@ark-ui/react/carousel`.
- Keeps Ark controlled and uncontrolled paging unchanged: `page`, `defaultPage`, and
  `onPageChange(details)`.
- Keeps Ark behavior props unchanged: `loop`, `autoplay`, `autoSize`, `slidesPerPage`,
  `slidesPerMove`, `spacing`, `padding`, `allowMouseDrag`, `orientation`, and `snapType`.
- Styles `CarouselControl` as a real flex container instead of overlaying triggers on top of the
  track. The recommended path keeps `CarouselItemGroup` as a sibling and uses `CarouselControl` as a
  toolbar.
- Ships left and right chevrons as default trigger content. When the default icons are used inside a
  vertical carousel, moduix rotates them to the Ark-style up and down directions.

## Anatomy and exported parts

```text
Carousel
├─ CarouselItemGroup
│  └─ CarouselItem
├─ CarouselControl
│  ├─ CarouselPrevTrigger
│  └─ CarouselNextTrigger
├─ CarouselIndicators
│  └─ CarouselIndicatorGroup
│     └─ CarouselIndicator
├─ CarouselAutoplayTrigger (optional)
├─ CarouselAutoplayIndicator (optional)
└─ CarouselProgressText (optional)

CarouselRootProvider
└─ same part tree connected to a useCarousel() store
```

Every styled part accepts `className` and receives a stable `data-slot`. `CarouselIndicators`
also accepts `indicatorClassName` for its generated `CarouselIndicator` items:

| Part                        | `data-slot`                   | Notes                                             |
| --------------------------- | ----------------------------- | ------------------------------------------------- |
| `Carousel`                  | `carousel-root`               | Styled Ark root.                                  |
| `CarouselRootProvider`      | `carousel-root-provider`      | Shares root styling and external state ownership. |
| `CarouselControl`           | `carousel-control`            | Real flex container, not overlay chrome.          |
| `CarouselItemGroup`         | `carousel-item-group`         | Styled Ark item group.                            |
| `CarouselItem`              | `carousel-item`               | Styled Ark item.                                  |
| `CarouselPrevTrigger`       | `carousel-prev-trigger`       | Defaults to a moduix left chevron.                |
| `CarouselNextTrigger`       | `carousel-next-trigger`       | Defaults to a moduix right chevron.               |
| `CarouselIndicators`        | `carousel-indicator-group`    | Default page indicator sugar based on context.    |
| `CarouselIndicatorGroup`    | `carousel-indicator-group`    | Styled Ark indicator group.                       |
| `CarouselIndicator`         | `carousel-indicator`          | Styled Ark indicator button.                      |
| `CarouselAutoplayTrigger`   | `carousel-autoplay-trigger`   | Styled Ark autoplay trigger.                      |
| `CarouselAutoplayIndicator` | `carousel-autoplay-indicator` | Styled Ark autoplay status part.                  |
| `CarouselProgressText`      | `carousel-progress-text`      | Styled Ark progress text part.                    |

## Composition

```tsx
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '@moduix/react/carousel';

export function BasicCarousel() {
  return (
    <Carousel aria-label="Gallery" slideCount={slides.length}>
      <CarouselItemGroup>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} index={index}>
            <img src={slide.src} alt={slide.alt} />
          </CarouselItem>
        ))}
      </CarouselItemGroup>

      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>

      <CarouselIndicators />

      <CarouselProgressText />
    </Carousel>
  );
}
```

Use `CarouselContext` when you want to bypass `CarouselIndicators` and render a custom pager from
runtime `pageSnapPoints`, such as thumbnail navigation or a mixed toolbar:

```tsx
<CarouselContext>
  {(api) => (
    <CarouselIndicatorGroup>
      {api.pageSnapPoints.map((_, index) => (
        <CarouselIndicator key={index} index={index} />
      ))}
    </CarouselIndicatorGroup>
  )}
</CarouselContext>
```

`CarouselControl` supports two recommended layouts:

- Render `CarouselItemGroup` separately and use `CarouselControl` as a companion toolbar for
  triggers, indicators, or autoplay controls. This is the default path.
- Place `CarouselItemGroup` inside `CarouselControl` only when a compact inline layout is the real
  design goal.

Use `CarouselRootProvider` with moduix `useCarousel()` only when carousel state must be created
outside the rendered subtree.

Use moduix `useCarouselContext()` inside custom reusable children that need the carousel API without
introducing another render prop.

## Upstream feature coverage

- `Anatomy`: preserved directly through the exported Ark-shaped parts.
- `Controlled`: preserved through `page` and `onPageChange(details)`.
- `Root Provider`: preserved through `CarouselRootProvider` and moduix `useCarousel()`.
- `Autoplay`: preserved through the Ark `autoplay` prop and autoplay parts.
- `Pause on Hover`: not built in, matching Ark; consumers use `CarouselContext` and `api.pause()`.
  Autoplay examples also pause on focus and leave restarting to `CarouselAutoplayTrigger`.
- `Indicators`: `CarouselIndicators` renders the default pager from runtime `pageSnapPoints`,
  including multi-slide and auto-size layouts.
- `Thumbnail Indicators`: preserved by rendering custom content inside `CarouselIndicator`.
- `Vertical`: preserved through `orientation="vertical"`.
- `Dynamic`: preserved through controlled page flow and `slideCount`.
- `Scroll to Slide`: preserved through `CarouselContext` and `api.scrollToIndex(index)`.
- `Slides Per Page`: preserved through `slidesPerPage` and `api.pageSnapPoints`.
- `Spacing`: preserved through `spacing`.
- `Variable Sizes`: preserved through `autoSize` and per-item snap alignment.

## Accessibility and state

- Ark state and runtime hooks remain available:
  - `data-orientation` on root and control
  - `data-dragging` on `CarouselItemGroup`
  - `data-current` and `data-readonly` on `CarouselIndicator`
  - `data-inview` and `data-index` on `CarouselItem`
  - `data-pressed` on `CarouselAutoplayTrigger`
- Ark runtime CSS variables remain available:
  - `--slides-per-page`
  - `--slide-spacing`
  - `--slide-item-size`
- Ark callback and API shapes remain unchanged, including `onPageChange(details)`,
  `onAutoplayStatusChange(details)`, and `onDragStatusChange(details)`.
- `CarouselContext`, `useCarousel`, and `useCarouselContext` are exported from moduix. Ark type aliases
  remain available from `@ark-ui/react/carousel`.
- `--moduix-carousel-indicator-size` controls the compact indicator button itself. The current
  indicator expands along the paging axis, and its focus ring follows the same dot or capsule
  geometry. Forced-colors mode keeps idle and current indicators distinguishable.
- `prefers-reduced-motion: reduce` disables moduix control and indicator transitions and changes
  the item group from smooth to immediate scrolling.
- `CarouselProgressText` isolates its numeric `current / total` output as left-to-right text so the
  order remains readable inside RTL carousels.

## Defaults and styling

Primary theme variables:

| Variable                                         | Default                                                                                  | Notes                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `--moduix-carousel-control-bg`                   | `color-mix(in oklab, var(--moduix-color-background) 92%, var(--moduix-color-card) 8%)`   | Trigger and autoplay button background.            |
| `--moduix-carousel-control-bg-hover`             | `var(--moduix-color-accent)`                                                             | Trigger and autoplay button hover background.      |
| `--moduix-carousel-control-border-color`         | `color-mix(in oklab, var(--moduix-color-border) 88%, black 12%)`                         | Trigger and autoplay button border.                |
| `--moduix-carousel-control-border-color-hover`   | `var(--moduix-color-ring)`                                                               | Trigger and autoplay button hover border.          |
| `--moduix-carousel-control-color`                | `var(--moduix-color-foreground)`                                                         | Trigger and autoplay button icon or text color.    |
| `--moduix-carousel-control-color-hover`          | `var(--moduix-color-accent-foreground)`                                                  | Trigger and autoplay button hover icon/text.       |
| `--moduix-carousel-control-shadow`               | `var(--moduix-shadow-sm)`                                                                | Trigger and autoplay button shadow.                |
| `--moduix-carousel-control-shadow-hover`         | `var(--moduix-shadow-md)`                                                                | Trigger and autoplay button hover shadow.          |
| `--moduix-carousel-autoplay-indicator-min-width` | `var(--moduix-spacing-4)`                                                                | Minimum width reserved for autoplay status.        |
| `--moduix-carousel-autoplay-trigger-min-width`   | `calc(var(--moduix-size-md) + var(--moduix-spacing-3))`                                  | Minimum width for the labelled autoplay trigger.   |
| `--moduix-carousel-control-icon-size`            | `var(--moduix-spacing-4)`                                                                | Trigger icon size.                                 |
| `--moduix-carousel-control-size`                 | `var(--moduix-size-md)`                                                                  | Trigger size.                                      |
| `--moduix-carousel-focus-ring-color`             | `var(--moduix-color-ring)`                                                               | Focus ring color for triggers and indicators.      |
| `--moduix-carousel-focus-ring-offset`            | `var(--moduix-focus-ring-offset)`                                                        | Focus ring offset.                                 |
| `--moduix-carousel-focus-ring-width`             | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))`                          | Focus ring width.                                  |
| `--moduix-carousel-gap`                          | `var(--moduix-spacing-3)`                                                                | Gap between carousel parts.                        |
| `--moduix-carousel-height`                       | `24rem`                                                                                  | Vertical-only root height. No effect horizontally. |
| `--moduix-carousel-indicator-bg`                 | `color-mix(in oklab, var(--moduix-color-muted) 84%, var(--moduix-color-background) 16%)` | Idle indicator color.                              |
| `--moduix-carousel-indicator-bg-current`         | `var(--moduix-color-primary)`                                                            | Active indicator color.                            |
| `--moduix-carousel-indicator-bg-hover`           | `color-mix(in oklab, var(--moduix-color-muted) 56%, var(--moduix-color-foreground) 44%)` | Indicator hover color.                             |
| `--moduix-carousel-indicator-gap`                | `var(--moduix-spacing-2)`                                                                | Gap between indicators.                            |
| `--moduix-carousel-indicator-size`               | `var(--moduix-spacing-2)`                                                                | Base indicator size.                               |
| `--moduix-carousel-progress-text-color`          | `var(--moduix-color-muted-foreground)`                                                   | Progress text color.                               |
| `--moduix-carousel-progress-text-font-size`      | `var(--moduix-text-sm)`                                                                  | Progress text font size.                           |
| `--moduix-carousel-track-radius`                 | `var(--moduix-radius-xl)`                                                                | Scroll track radius.                               |

## Intentional sugar and differences from upstream

- moduix ships styled controls, indicators, and progress text; Ark is intentionally unstyled.
- moduix adds `CarouselIndicators` as narrow sugar for the default page-dot pager while keeping
  `CarouselIndicatorGroup` and `CarouselIndicator` public for custom layouts. `className` styles the
  generated group, and `indicatorClassName` styles each generated indicator.
- moduix favors an explicit flex layout for `CarouselControl` instead of absolute-position trigger
  chrome.
- The default trigger icons are moduix chevrons, not Ark example icons.
- moduix re-exports `CarouselContext` to keep runtime API access on the same surface as the styled
  parts.
- moduix exports `useCarousel` and `useCarouselContext` from the package barrel for provider and
  custom-child composition.
- `data-pressed` on autoplay controls and `data-readonly` or disabled indicators receive moduix
  visual state defaults.
- moduix keeps `CarouselRootProvider`, `useCarousel`, and `useCarouselContext`; Ark type aliases
  remain available from `@ark-ui/react/carousel`.

## Agent notes

- Keep Ark callback and state shapes untouched, especially `onPageChange(details)`.
- Do not reintroduce the old native-scroll-only wrapper contract.
- Keep `CarouselControl` structural. Do not hide `CarouselItemGroup`, `CarouselIndicatorGroup`, or
  autoplay parts behind broad convenience wrappers. `CarouselIndicators` is the limit of the intended
  sugar here.
- Put an accessible name on `Carousel` or `CarouselRootProvider`, not only on `CarouselItemGroup`.

## Local changelog

- 2026-09-21: Replaced the compound `Carousel.*` value surface with the shared flat API. `Carousel`
  is now the only root value; every other part uses a `Carousel`-prefixed named export, and the Ark
  context is re-exported as `CarouselContext`.
- 2026-08-09: Kept compact indicator geometry and matching focus rings, stabilized the active color
  on hover, added forced-colors and reduced-motion fallbacks, kept numeric progress readable in RTL,
  and covered RTL rendering plus public ref and `asChild` composition.
- 2026-07-26: Mirrored default horizontal trigger icons in RTL, prevented hover styling on unavailable
  indicators, and documented accessible root labels plus moduix hook exports.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-09: Added `CarouselIndicators`, moved the recommended composition to `ItemGroup` plus a
  sibling `Control` toolbar, and reserved manual `IndicatorGroup` rendering for advanced
  customization.
- 2026-07-07: Re-exported `CarouselContext`, simplified advanced examples around context usage, and
  documented the two supported `Control` layout patterns plus vertical-only height behavior.
- 2026-07-02: Removed duplicate Ark type exports, `Context`, and state hooks from the moduix
  surface. Kept `RootProvider`, the callable root, every visual part, and default trigger icons.
- 2026-06-18: Adopted Ark UI `Carousel` naming, paging, autoplay, and provider contracts, and
  removed the legacy native-scroll sugar API.
- 2026-06-18: Reworked the layout and styling contract around Ark composition, removed overlayed
  trigger positioning, improved vertical control placement, and expanded the public examples to
  cover the full Ark carousel surface.
- 2026-06-18: Added explicit public examples for `loop` and `allowMouseDrag`, and aligned the docs
  styling section with the shared `Accordion` CSS properties tab pattern.
- 2026-06-18: Exported `useCarouselContext()` and added styled defaults for autoplay pressed state
  plus read-only and disabled indicators.
- 2026-06-24: Simplified docs and story examples around slide indicators vs runtime `pageSnapPoints`,
  aligned the spacing example with Ark's `slidesPerPage={1.5}` pattern, and normalized carousel CSS
  sizing values to the local spacing scale.