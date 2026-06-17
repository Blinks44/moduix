# Carousel

Upstream primitive docs:

- Ark UI: https://ark-ui.com/docs/components/carousel
- Chakra UI: https://chakra-ui.com/docs/components/carousel

## Purpose

`Carousel` is the moduix wrapper around Ark UI Carousel for paged image tracks, multi-slide layouts,
variable-size items, autoplay, and provider-driven flows.

The wrapper keeps Ark paging and runtime state intact while adding moduix visual defaults, CSS
variables, and stable `data-slot` hooks.

## Current behavior contract

- Uses Ark composition directly: `Carousel.Root`, `Carousel.RootProvider`, `Carousel.Control`,
  `Carousel.ItemGroup`, `Carousel.Item`, `Carousel.PrevTrigger`, `Carousel.NextTrigger`,
  `Carousel.IndicatorGroup`, `Carousel.Indicator`, `Carousel.AutoplayTrigger`,
  `Carousel.AutoplayIndicator`, `Carousel.ProgressText`, `Carousel.Context`, and `useCarousel()`.
- Keeps Ark controlled and uncontrolled paging unchanged: `page`, `defaultPage`, and
  `onPageChange(details)`.
- Keeps Ark behavior props unchanged: `loop`, `autoplay`, `autoSize`, `slidesPerPage`,
  `slidesPerMove`, `spacing`, `padding`, `allowMouseDrag`, `orientation`, and `snapType`.
- Styles `Carousel.Control` as a real flex container instead of overlaying triggers on top of the
  track. This supports Ark layouts where `ItemGroup` is placed inside `Control`.
- Ships left and right chevrons as default trigger content. When the default icons are used inside a
  vertical carousel, moduix rotates them to the Ark-style up and down directions.

## Composition

```tsx
import { Carousel } from 'moduix';

export function BasicCarousel() {
  return (
    <Carousel.Root slideCount={slides.length}>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.ItemGroup aria-label="Gallery">
          {slides.map((slide, index) => (
            <Carousel.Item key={slide.id} index={index}>
              <img src={slide.src} alt={slide.alt} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.IndicatorGroup>
        {slides.map((_, index) => (
          <Carousel.Indicator key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>

      <Carousel.ProgressText />
    </Carousel.Root>
  );
}
```

Use `Carousel.Context` when the number of page snap points depends on runtime layout, such as
`autoSize`, `slidesPerPage > 1`, or custom `scrollToIndex` controls:

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

Use `Carousel.RootProvider` with `useCarousel()` only when carousel state must be created outside
the rendered subtree.

## Defaults and styling

Every styled part accepts `className` and receives a stable `data-slot`:

| Part                         | `data-slot`                   |
| ---------------------------- | ----------------------------- |
| `Carousel.Root`              | `carousel-root`               |
| `Carousel.RootProvider`      | `carousel-root-provider`      |
| `Carousel.Control`           | `carousel-control`            |
| `Carousel.ItemGroup`         | `carousel-item-group`         |
| `Carousel.Item`              | `carousel-item`               |
| `Carousel.PrevTrigger`       | `carousel-prev-trigger`       |
| `Carousel.NextTrigger`       | `carousel-next-trigger`       |
| `Carousel.IndicatorGroup`    | `carousel-indicator-group`    |
| `Carousel.Indicator`         | `carousel-indicator`          |
| `Carousel.AutoplayTrigger`   | `carousel-autoplay-trigger`   |
| `Carousel.AutoplayIndicator` | `carousel-autoplay-indicator` |
| `Carousel.ProgressText`      | `carousel-progress-text`      |

Ark state and runtime hooks remain available:

- `data-orientation` on root and control
- `data-dragging` on `Carousel.ItemGroup`
- `data-current` on `Carousel.Indicator`
- `data-inview` and `data-index` on `Carousel.Item`
- Ark runtime CSS variables such as `--slides-per-page`, `--slide-spacing`, and `--slide-item-size`

Primary theme variables:

| Variable                                | Default                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------- |
| `--carousel-control-bg`                 | `color-mix(in oklab, var(--color-background) 92%, var(--color-card) 8%)`    |
| `--carousel-control-bg-hover`           | `var(--color-accent)`                                                       |
| `--carousel-control-border-color`       | `color-mix(in oklab, var(--color-border) 88%, black 12%)`                   |
| `--carousel-control-border-color-hover` | `color-mix(in oklab, var(--color-border) 50%, var(--color-foreground) 50%)` |
| `--carousel-control-color`              | `var(--color-foreground)`                                                   |
| `--carousel-control-color-hover`        | `var(--color-accent-foreground)`                                            |
| `--carousel-control-shadow`             | `var(--shadow-sm)`                                                          |
| `--carousel-control-shadow-hover`       | `var(--shadow-md)`                                                          |
| `--carousel-control-size`               | `2.5rem`                                                                    |
| `--carousel-focus-ring-color`           | `var(--color-ring)`                                                         |
| `--carousel-focus-ring-offset`          | `2px`                                                                       |
| `--carousel-focus-ring-width`           | `var(--border-width-md)`                                                    |
| `--carousel-gap`                        | `var(--spacing-3)`                                                          |
| `--carousel-height`                     | `24rem`                                                                     |
| `--carousel-indicator-bg`               | `color-mix(in oklab, var(--color-muted) 84%, var(--color-background) 16%)`  |
| `--carousel-indicator-bg-current`       | `var(--color-primary)`                                                      |
| `--carousel-indicator-bg-hover`         | `color-mix(in oklab, var(--color-muted) 56%, var(--color-foreground) 44%)`  |
| `--carousel-indicator-gap`              | `var(--spacing-2)`                                                          |
| `--carousel-indicator-size`             | `0.5rem`                                                                    |
| `--carousel-progress-text-color`        | `var(--color-muted-foreground)`                                             |
| `--carousel-progress-text-font-size`    | `var(--text-sm)`                                                            |
| `--carousel-track-radius`               | `var(--radius-xl)`                                                          |

## Intentional differences from upstream

- moduix ships styled controls, indicators, and progress text; Ark is intentionally unstyled.
- moduix favors an explicit flex layout for `Control` instead of absolute-position trigger chrome.
- The default trigger icons are moduix chevrons, not Ark example icons.

## Agent notes

- Keep Ark callback and state shapes untouched, especially `onPageChange(details)` and
  `Carousel.Context`.
- Do not reintroduce the old `SnapCarousel` aliases or the native-scroll-only wrapper contract.
- Keep `Carousel.Control` structural. Do not hide `ItemGroup`, `IndicatorGroup`, or autoplay parts
  behind convenience wrappers.

## Local changelog

- 2026-06-18: Replaced `SnapCarousel` with Ark UI `Carousel`, adopted Ark naming and Ark paging,
  autoplay, and provider contracts, and removed the legacy native-scroll sugar API.
- 2026-06-18: Reworked the layout and styling contract around Ark composition, removed overlayed
  trigger positioning, improved vertical control placement, and expanded the public examples to
  cover the full Ark carousel surface.
- 2026-06-18: Added explicit public examples for `loop` and `allowMouseDrag`, and aligned the docs
  styling section with the shared `Accordion` CSS properties tab pattern.