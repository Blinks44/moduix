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
- Keeps Ark anatomy centered on `Root`, `Control`, `ItemGroup`, `Item`, triggers, indicators, and
  optional autoplay parts.
- Keeps Ark page control, provider/context flow, orientation handling, drag/autoplay state, and
  runtime API intact.

## Current behavior contract

- Uses Ark composition directly: `Carousel.Root`, `Carousel.RootProvider`, `Carousel.Control`,
  `Carousel.Context`, `Carousel.ItemGroup`, `Carousel.Item`, `Carousel.PrevTrigger`,
  `Carousel.NextTrigger`, `Carousel.Indicators`, `Carousel.IndicatorGroup`, `Carousel.Indicator`,
  `Carousel.AutoplayTrigger`, `Carousel.AutoplayIndicator`, and `Carousel.ProgressText`.
- Keeps the callable root pattern, so `<Carousel />` and `<Carousel.Root />` are equivalent.
- `Carousel.Context` is re-exported for runtime carousel API access. Hooks and type aliases are still
  imported directly from `@ark-ui/react/carousel`.
- Keeps Ark controlled and uncontrolled paging unchanged: `page`, `defaultPage`, and
  `onPageChange(details)`.
- Keeps Ark behavior props unchanged: `loop`, `autoplay`, `autoSize`, `slidesPerPage`,
  `slidesPerMove`, `spacing`, `padding`, `allowMouseDrag`, `orientation`, and `snapType`.
- Styles `Carousel.Control` as a real flex container instead of overlaying triggers on top of the
  track. The recommended path keeps `ItemGroup` as a sibling and uses `Control` as a toolbar.
- Ships left and right chevrons as default trigger content. When the default icons are used inside a
  vertical carousel, moduix rotates them to the Ark-style up and down directions.

## Anatomy and exported parts

```text
Carousel / Carousel.Root
├─ Carousel.ItemGroup
│  └─ Carousel.Item
├─ Carousel.Control
│  ├─ Carousel.PrevTrigger
│  └─ Carousel.NextTrigger
├─ Carousel.Indicators
│  └─ Carousel.IndicatorGroup
│     └─ Carousel.Indicator
├─ Carousel.AutoplayTrigger (optional)
├─ Carousel.AutoplayIndicator (optional)
└─ Carousel.ProgressText (optional)
```

Every styled part accepts `className` and receives a stable `data-slot`. `Carousel.Indicators`
also accepts `indicatorClassName` for its generated `Carousel.Indicator` items:

| Part                         | `data-slot`                   | Notes                                             |
| ---------------------------- | ----------------------------- | ------------------------------------------------- |
| `Carousel.Root`              | `carousel-root`               | Styled Ark root.                                  |
| `Carousel.RootProvider`      | `carousel-root-provider`      | Shares root styling and external state ownership. |
| `Carousel.Control`           | `carousel-control`            | Real flex container, not overlay chrome.          |
| `Carousel.ItemGroup`         | `carousel-item-group`         | Styled Ark item group.                            |
| `Carousel.Item`              | `carousel-item`               | Styled Ark item.                                  |
| `Carousel.PrevTrigger`       | `carousel-prev-trigger`       | Defaults to a moduix left chevron.                |
| `Carousel.NextTrigger`       | `carousel-next-trigger`       | Defaults to a moduix right chevron.               |
| `Carousel.Indicators`        | `carousel-indicator-group`    | Default page indicator sugar based on context.    |
| `Carousel.IndicatorGroup`    | `carousel-indicator-group`    | Styled Ark indicator group.                       |
| `Carousel.Indicator`         | `carousel-indicator`          | Styled Ark indicator button.                      |
| `Carousel.AutoplayTrigger`   | `carousel-autoplay-trigger`   | Styled Ark autoplay trigger.                      |
| `Carousel.AutoplayIndicator` | `carousel-autoplay-indicator` | Styled Ark autoplay status part.                  |
| `Carousel.ProgressText`      | `carousel-progress-text`      | Styled Ark progress text part.                    |

## Composition

```tsx
import { Carousel } from '@moduix/react';

export function BasicCarousel() {
  return (
    <Carousel slideCount={slides.length}>
      <Carousel.ItemGroup aria-label="Gallery">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <img src={slide.src} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.Indicators />

      <Carousel.ProgressText />
    </Carousel>
  );
}
```

Use `Carousel.Context` when you want to bypass `Carousel.Indicators` and render a custom pager from
runtime `pageSnapPoints`, such as thumbnail navigation or a mixed toolbar:

```tsx
<Carousel.Context>
  {(api) => (
    <Carousel.IndicatorGroup>
      {api.pageSnapPoints.map((_, index) => (
        <Carousel.Indicator key={index} index={index} />
      ))}
    </Carousel.IndicatorGroup>
  )}
</Carousel.Context>
```

`Carousel.Control` supports two recommended layouts:

- Render `ItemGroup` separately and use `Control` as a companion toolbar for triggers, indicators, or
  autoplay controls. This is the default path.
- Place `ItemGroup` inside `Control` only when a compact inline layout is the real design goal.

Use `Carousel.RootProvider` with Ark `useCarousel()` only when carousel state must be created
outside the rendered subtree.

Use Ark `useCarouselContext()` inside custom reusable children that need the carousel API without
introducing another render prop.

## Upstream feature coverage

- `Anatomy`: preserved directly through the exported Ark-shaped parts.
- `Controlled`: preserved through `page` and `onPageChange(details)`.
- `Root Provider`: preserved through `Carousel.RootProvider` and Ark `useCarousel()`.
- `Autoplay`: preserved through the Ark `autoplay` prop and autoplay parts.
- `Pause on Hover`: not built in, matching Ark; consumers use `Carousel.Context` and
  `api.pause()` or `api.play()`.
- `Indicators`: `Carousel.Indicators` renders the default pager from runtime `pageSnapPoints`,
  including multi-slide and auto-size layouts.
- `Thumbnail Indicators`: preserved by rendering custom content inside `Carousel.Indicator`.
- `Vertical`: preserved through `orientation="vertical"`.
- `Dynamic`: preserved through controlled page flow and `slideCount`.
- `Scroll to Slide`: preserved through `Carousel.Context` and `api.scrollToIndex(index)`.
- `Slides Per Page`: preserved through `slidesPerPage` and `api.pageSnapPoints`.
- `Spacing`: preserved through `spacing`.
- `Variable Sizes`: preserved through `autoSize` and per-item snap alignment.

## Accessibility and state

- Ark state and runtime hooks remain available:
  - `data-orientation` on root and control
  - `data-dragging` on `Carousel.ItemGroup`
  - `data-current` and `data-readonly` on `Carousel.Indicator`
  - `data-inview` and `data-index` on `Carousel.Item`
  - `data-pressed` on `Carousel.AutoplayTrigger`
- Ark runtime CSS variables remain available:
  - `--slides-per-page`
  - `--slide-spacing`
  - `--slide-item-size`
- Ark callback and API shapes remain unchanged, including `onPageChange(details)`,
  `onAutoplayStatusChange(details)`, and `onDragStatusChange(details)`.
- `Carousel.Context` is re-exported from moduix. Ark state hooks and type aliases are still imported
  directly from `@ark-ui/react/carousel`.

## Defaults and styling

Primary theme variables:

| Variable                                         | Default                                                                                   | Notes                                              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `--moduix-carousel-control-bg`                   | `color-mix(in oklab, var(--moduix-color-background) 92%, var(--moduix-color-card) 8%)`    | Trigger and autoplay button background.            |
| `--moduix-carousel-control-bg-hover`             | `var(--moduix-color-accent)`                                                              | Trigger and autoplay button hover background.      |
| `--moduix-carousel-control-border-color`         | `color-mix(in oklab, var(--moduix-color-border) 88%, black 12%)`                          | Trigger and autoplay button border.                |
| `--moduix-carousel-control-border-color-hover`   | `color-mix(in oklab, var(--moduix-color-border) 50%, var(--moduix-color-foreground) 50%)` | Trigger and autoplay button hover border.          |
| `--moduix-carousel-control-color`                | `var(--moduix-color-foreground)`                                                          | Trigger and autoplay button icon or text color.    |
| `--moduix-carousel-control-color-hover`          | `var(--moduix-color-accent-foreground)`                                                   | Trigger and autoplay button hover icon/text.       |
| `--moduix-carousel-control-shadow`               | `var(--moduix-shadow-sm)`                                                                 | Trigger and autoplay button shadow.                |
| `--moduix-carousel-control-shadow-hover`         | `var(--moduix-shadow-md)`                                                                 | Trigger and autoplay button hover shadow.          |
| `--moduix-carousel-autoplay-indicator-min-width` | `var(--moduix-spacing-4)`                                                                 | Minimum width reserved for autoplay status.        |
| `--moduix-carousel-autoplay-trigger-min-width`   | `calc(var(--moduix-size-md) + var(--moduix-spacing-3))`                                   | Minimum width for the labelled autoplay trigger.   |
| `--moduix-carousel-control-icon-size`            | `var(--moduix-spacing-4)`                                                                 | Trigger icon size.                                 |
| `--moduix-carousel-control-size`                 | `var(--moduix-size-md)`                                                                   | Trigger size.                                      |
| `--moduix-carousel-focus-ring-color`             | `var(--moduix-color-ring)`                                                                | Focus ring color for triggers and indicators.      |
| `--moduix-carousel-focus-ring-offset`            | `var(--moduix-focus-ring-offset)`                                                         | Focus ring offset.                                 |
| `--moduix-carousel-focus-ring-width`             | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))`                           | Focus ring width.                                  |
| `--moduix-carousel-gap`                          | `var(--moduix-spacing-3)`                                                                 | Gap between carousel parts.                        |
| `--moduix-carousel-height`                       | `24rem`                                                                                   | Vertical-only root height. No effect horizontally. |
| `--moduix-carousel-indicator-bg`                 | `color-mix(in oklab, var(--moduix-color-muted) 84%, var(--moduix-color-background) 16%)`  | Idle indicator color.                              |
| `--moduix-carousel-indicator-bg-current`         | `var(--moduix-color-primary)`                                                             | Active indicator color.                            |
| `--moduix-carousel-indicator-bg-hover`           | `color-mix(in oklab, var(--moduix-color-muted) 56%, var(--moduix-color-foreground) 44%)`  | Indicator hover color.                             |
| `--moduix-carousel-indicator-gap`                | `var(--moduix-spacing-2)`                                                                 | Gap between indicators.                            |
| `--moduix-carousel-indicator-size`               | `var(--moduix-spacing-2)`                                                                 | Base indicator size.                               |
| `--moduix-carousel-progress-text-color`          | `var(--moduix-color-muted-foreground)`                                                    | Progress text color.                               |
| `--moduix-carousel-progress-text-font-size`      | `var(--moduix-text-sm)`                                                                   | Progress text font size.                           |
| `--moduix-carousel-track-radius`                 | `var(--moduix-radius-xl)`                                                                 | Scroll track radius.                               |

## Intentional sugar and differences from upstream

- moduix ships styled controls, indicators, and progress text; Ark is intentionally unstyled.
- moduix adds `Carousel.Indicators` as narrow sugar for the default page-dot pager while keeping
  `IndicatorGroup` and `Indicator` public for custom layouts. `className` styles the generated
  group, and `indicatorClassName` styles each generated indicator.
- moduix favors an explicit flex layout for `Control` instead of absolute-position trigger chrome.
- The default trigger icons are moduix chevrons, not Ark example icons.
- moduix re-exports `Carousel.Context` to keep runtime API access on the same namespace as the
  styled parts.
- `data-pressed` on autoplay controls and `data-readonly` or disabled indicators receive moduix
  visual state defaults.
- moduix keeps `RootProvider`, but Ark state hooks and type aliases are still imported directly from
  `@ark-ui/react/carousel`.

## Agent notes

- Keep Ark callback and state shapes untouched, especially `onPageChange(details)`.
- Do not reintroduce the old native-scroll-only wrapper contract.
- Keep `Carousel.Control` structural. Do not hide `ItemGroup`, `IndicatorGroup`, or autoplay parts
  behind broad convenience wrappers. `Carousel.Indicators` is the limit of the intended sugar here.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-09: Added `Carousel.Indicators`, moved the recommended composition to `ItemGroup` plus a
  sibling `Control` toolbar, and reserved manual `IndicatorGroup` rendering for advanced
  customization.
- 2026-07-07: Re-exported `Carousel.Context`, simplified advanced examples around context usage, and
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