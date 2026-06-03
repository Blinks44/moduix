# SnapCarousel

## Purpose

`SnapCarousel` is the moduix native scroll-snap carousel. It is intentionally small: browser scrolling
and CSS `scroll-snap` do the movement, while moduix adds a thin composition layer, default previous /
next controls, and a small styling contract.

Use it for simple, swipeable or horizontally scrollable slide rows where native scrolling is a feature,
not something to hide. It is **not** the library's full-featured carousel primitive.

## Current behavior contract

Recommended path:

```tsx
import { SnapCarousel, SnapCarouselContent, SnapCarouselNext, SnapCarouselPrevious } from 'moduix';

export function DestinationCarousel() {
  return (
    <SnapCarousel>
      <SnapCarouselContent aria-label="Featured destinations">
        {destinations.map((destination, index) => (
          <article key={destination.title}>
            <img src={destination.image} alt={destination.alt} />
            <div>
              <p>
                {destination.eyebrow} / 0{index + 1}
              </p>
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
            </div>
          </article>
        ))}
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}
```

What the default path does:

- `SnapCarousel` renders a styled root `div` and provides orientation-aware scrolling to the controls.
- `SnapCarouselContent` creates the viewport automatically when it is used directly under
  `SnapCarousel`.
- In that sugar path, each direct child is wrapped in `SnapCarouselItem`.
- `SnapCarouselPrevious` and `SnapCarouselNext` call native `scrollBy(...)` by about `85%` of the
  current viewport size.
- The component keeps native wheel, touch, and trackpad scrolling behavior intact.

This wrapper intentionally does **not** provide active-slide state, indicators, looping, autoplay,
drag handles, or edge-aware button disabling.

## Composition

Default structure:

```text
SnapCarousel
├─ SnapCarouselContent
├─ SnapCarouselPrevious
└─ SnapCarouselNext
```

Explicit structure:

```text
SnapCarousel
├─ SnapCarouselViewport
│  └─ SnapCarouselContent
│     └─ SnapCarouselItem
├─ SnapCarouselPrevious
└─ SnapCarouselNext
```

Use the default path when each direct child should become one slide. Drop to the explicit parts when
you need:

- direct access to the scroll container;
- custom wrappers around each slide;
- per-item classes via explicit `SnapCarouselItem`;
- a different layout around the track.

Example with explicit parts:

```tsx
import {
  SnapCarousel,
  SnapCarouselContent,
  SnapCarouselItem,
  SnapCarouselNext,
  SnapCarouselPrevious,
  SnapCarouselViewport,
} from 'moduix';

export function CardsCarousel() {
  return (
    <SnapCarousel className={styles.cardsCarousel}>
      <SnapCarouselViewport aria-label="Featured destination cards">
        <SnapCarouselContent>
          {destinations.map((destination, index) => (
            <SnapCarouselItem key={destination.title}>
              <article>
                <img src={destination.image} alt="" />
                <div>
                  <p>
                    0{index + 1} / {destination.eyebrow}
                  </p>
                  <h3>{destination.title}</h3>
                  <p>{destination.description}</p>
                </div>
              </article>
            </SnapCarouselItem>
          ))}
        </SnapCarouselContent>
      </SnapCarouselViewport>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}
```

## Public props

The wrapper keeps the public type surface intentionally small. `SnapCarousel` and the exported parts
forward native element props instead of introducing many wrapper-only prop types.

### `SnapCarousel`

`SnapCarousel` accepts `ComponentProps<'div'>` plus:

| Prop          | Type                           | Default        | Behavior                            |
| ------------- | ------------------------------ | -------------- | ----------------------------------- |
| `align`       | `'start' \| 'center' \| 'end'` | `'start'`      | Sets item `scroll-snap-align`.      |
| `orientation` | `'horizontal' \| 'vertical'`   | `'horizontal'` | Switches the native scrolling axis. |

Notes:

- `align` only affects the item CSS via `data-align` on the root.
- Vertical carousels need a bounded height from local CSS or `--snap-carousel-height`.

### `SnapCarouselViewport`

`SnapCarouselViewport` is the native scroll container.

| Prop                             | Behavior                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| native `div` props               | Forwarded to the rendered viewport.                                                             |
| `tabIndex`                       | Defaults to `0` so the viewport can receive keyboard focus.                                     |
| `aria-label` / `aria-labelledby` | When either is provided, the viewport defaults `role="region"` so the label becomes meaningful. |
| `role`                           | Optional override when a consumer needs a different role.                                       |

### `SnapCarouselContent`

`SnapCarouselContent` accepts native `div` props plus:

| Prop            | Type     | Behavior                                                                         |
| --------------- | -------- | -------------------------------------------------------------------------------- |
| `itemClassName` | `string` | Applied to generated `SnapCarouselItem` wrappers in the default sugar path only. |

Important behavior:

- When rendered inside `SnapCarouselViewport`, it is only the flex track.
- When rendered directly under `SnapCarousel`, it creates the viewport automatically.
- In the sugar path, `aria-label`, `aria-labelledby`, `aria-describedby`, `tabIndex`, and `onKeyDown`
  are forwarded to the generated viewport, not the track.

### `SnapCarouselItem`

`SnapCarouselItem` is a thin `div` wrapper for one snap point. It accepts native `div` props and
does not add extra state or ARIA metadata.

### `SnapCarouselPrevious` / `SnapCarouselNext`

Both controls accept native `button` props.

Behavior:

- default `type="button"`;
- default icon based on direction and orientation;
- default accessible labels only in icon-only mode;
- native `disabled` works as expected;
- `aria-disabled="true"` gets disabled styling, but consumers still need to prevent the click action
  themselves, for example by calling `event.preventDefault()` in `onClick`.

## Defaults and styling

Stable `data-slot` hooks:

| Part                   | `data-slot`              |
| ---------------------- | ------------------------ |
| `SnapCarousel`         | `snap-carousel-root`     |
| `SnapCarouselViewport` | `snap-carousel-viewport` |
| `SnapCarouselContent`  | `snap-carousel-content`  |
| `SnapCarouselItem`     | `snap-carousel-item`     |
| `SnapCarouselPrevious` | `snap-carousel-previous` |
| `SnapCarouselNext`     | `snap-carousel-next`     |

Additional public data attributes:

| Part           | Attribute                                                       |
| -------------- | --------------------------------------------------------------- |
| `SnapCarousel` | `data-align="start"`, `data-align="center"`, `data-align="end"` |
| `SnapCarousel` | `data-orientation="horizontal"`, `data-orientation="vertical"`  |

Public CSS variables from `theme.css`:

| Variable                            | Default / fallback       | Purpose                                                   |
| ----------------------------------- | ------------------------ | --------------------------------------------------------- |
| `--snap-carousel-focus-ring-color`  | `var(--color-ring)`      | Viewport and control focus ring color.                    |
| `--snap-carousel-focus-ring-offset` | `var(--spacing-1)`       | Viewport and control focus ring offset.                   |
| `--snap-carousel-focus-ring-width`  | `var(--border-width-md)` | Viewport and control focus ring width.                    |
| `--snap-carousel-gap`               | `var(--spacing-3)`       | Gap between the viewport and surrounding controls/layout. |
| `--snap-carousel-height`            | `100%`                   | Height used by the vertical root layout.                  |
| `--snap-carousel-item-gap`          | `var(--spacing-4)`       | Gap between snap items.                                   |
| `--snap-carousel-item-size`         | `100%`                   | Flex basis for each snap item.                            |
| `--snap-carousel-snap-stop`         | `normal`                 | `scroll-snap-stop` for each item.                         |

Example override:

```css
.cardsCarousel {
  --snap-carousel-item-size: min(15rem, 72%);
  --snap-carousel-item-gap: var(--spacing-4);
}
```

There are no variants, slot prop bags, `classNames` maps, or helper styling props. Customize through
`className`, composition, and the documented CSS variables.

## Accessibility and UX

- Give the viewport an accessible name. In the sugar path, pass `aria-label` or `aria-labelledby` to
  `SnapCarouselContent`; in explicit composition, pass it to `SnapCarouselViewport`.
- The viewport is focusable by default, so browser-native keyboard scrolling can work without extra
  state management.
- Controls get default accessible labels only when they stay icon-only. If you replace the icon with
  custom non-text content, keep an accessible name with `aria-label`.
- Native `disabled` is the preferred way to disable controls. Use `aria-disabled` only when you need
  focusable disabled semantics and you also own the interaction guard.
- Items are plain `div`s. The component does not add slide counts, roving focus, live announcements,
  or per-slide ARIA labels.

## Intentional differences from a stateful carousel

- `SnapCarousel` is not a managed carousel widget with current-index state.
- It does not disable previous / next buttons at the scroll edges.
- It does not expose controlled or uncontrolled active-slide props.
- It does not render indicators, thumbnails, autoplay, or looping.
- It does not add slide semantics like `"Slide 2 of 5"` for assistive tech.

If a product needs those behaviors, build them explicitly or add a separate higher-level carousel
primitive instead of expanding this wrapper into a large configuration API.

## Agent notes

- Preserve the small, native-scroll contract. Do not turn this component into a stateful carousel
  unless a user explicitly asks for that behavior.
- Keep `SnapCarouselContent` as the default path and `SnapCarouselViewport` / `SnapCarouselItem` as
  the explicit escape hatch.
- Keep `itemClassName` limited to the default sugar path instead of introducing parallel slot-prop APIs.
- If styling hooks or CSS variables change, update `SnapCarousel.module.css`, `theme.css`, stories,
  `apps/docs/content/docs/snap-carousel.mdx`, and `apps/docs/src/components/examples/snap-carousel.tsx`
  in the same task.
- Keep docs honest about limitations: this component provides native scrolling with a small wrapper
  API, not a full carousel accessibility model.

## Local changelog

- Rewrote the local documentation around the shipped moduix `SnapCarousel` contract instead of a Base
  UI-shaped summary.
- Documented the real sugar path, explicit composition path, `itemClassName`, stable styling hooks,
  CSS variables, and control behavior.
- Recorded the accessibility expectations and the intentional limitations of the native scroll-snap
  approach so future changes do not accidentally overstate its feature set.