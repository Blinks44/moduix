# SnapCarousel

Minimal native carousel built on browser scrolling and CSS `scroll-snap`.

It intentionally includes only one desktop-friendly sugar: simple previous/next buttons that call
native `scrollBy`. Indicators, autoplay, looping, disabled button state, and controlled state should
be handled by a future full carousel primitive.

## Recommended path

Use `SnapCarousel` with `SnapCarouselContent` for the common case. Content creates the viewport and
wraps each direct child in a snap item.

```tsx
import { SnapCarousel, SnapCarouselContent, SnapCarouselNext, SnapCarouselPrevious } from 'moduix';

export function Gallery() {
  return (
    <SnapCarousel>
      <SnapCarouselContent aria-label="Featured products">
        <img src="/product-1.jpg" alt="Product 1" />
        <img src="/product-2.jpg" alt="Product 2" />
        <img src="/product-3.jpg" alt="Product 3" />
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}
```

## Composition

Drop to the parts when you need explicit item wrappers or direct access to the native viewport.

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
    <SnapCarousel align="center">
      <SnapCarouselViewport aria-label="Featured cards">
        <SnapCarouselContent>
          {cards.map((card) => (
            <SnapCarouselItem key={card.id}>
              <Card>{card.title}</Card>
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

## Parts

| Part                   | Element  | Data attributes                               | Purpose                      |
| ---------------------- | -------- | --------------------------------------------- | ---------------------------- |
| `SnapCarousel`         | `div`    | `data-slot`, `data-align`, `data-orientation` | Root styling.                |
| `SnapCarouselViewport` | `div`    | `data-slot="snap-carousel-viewport"`          | Native scroll container.     |
| `SnapCarouselContent`  | `div`    | `data-slot="snap-carousel-content"`           | Content sugar or flex track. |
| `SnapCarouselItem`     | `div`    | `data-slot="snap-carousel-item"`              | Individual snap point.       |
| `SnapCarouselPrevious` | `button` | `data-slot="snap-carousel-previous"`          | Scrolls backward.            |
| `SnapCarouselNext`     | `button` | `data-slot="snap-carousel-next"`              | Scrolls forward.             |

## Public props

`SnapCarousel` accepts native `div` props plus:

| Prop          | Type                           | Default        | Notes                            |
| ------------- | ------------------------------ | -------------- | -------------------------------- |
| `align`       | `'start' \| 'center' \| 'end'` | `'start'`      | Sets item `scroll-snap-align`.   |
| `orientation` | `'horizontal' \| 'vertical'`   | `'horizontal'` | Switches the native scroll axis. |

`SnapCarouselContent` accepts `itemClassName` when used directly under `SnapCarousel`. Accessibility
props like `aria-label`, `aria-labelledby`, `aria-describedby`, `tabIndex`, and `onKeyDown` are
forwarded to the generated viewport.

`SnapCarouselPrevious` and `SnapCarouselNext` accept native `button` props. They are intentionally
stateless and do not disable themselves at scroll edges.

## Styling API

Use `className` on parts for local styling and CSS variables for token-level customization.

| Variable                            | Default/fallback         | Affects                     |
| ----------------------------------- | ------------------------ | --------------------------- |
| `--snap-carousel-focus-ring-color`  | `var(--color-ring)`      | Viewport focus ring color.  |
| `--snap-carousel-focus-ring-offset` | `var(--spacing-1)`       | Viewport focus ring offset. |
| `--snap-carousel-focus-ring-width`  | `var(--border-width-md)` | Viewport focus ring width.  |
| `--snap-carousel-gap`               | `var(--spacing-3)`       | Root layout gap.            |
| `--snap-carousel-height`            | `100%`                   | Vertical carousel height.   |
| `--snap-carousel-item-gap`          | `var(--spacing-4)`       | Gap between slides.         |
| `--snap-carousel-item-size`         | `100%`                   | Slide flex-basis.           |
| `--snap-carousel-snap-stop`         | `normal`                 | Item `scroll-snap-stop`.    |

```css
.cards {
  --snap-carousel-item-size: min(18rem, 82%);
  --snap-carousel-item-gap: var(--spacing-3);
}
```

## UX and accessibility

- Put an accessible label on `SnapCarouselContent`, or on `SnapCarouselViewport` in full composition.
- The viewport is focusable so native keyboard scrolling can work where browsers support it.
- Native wheel, touch, trackpad, and browser momentum behavior stays intact.
- Previous/next controls scroll by most of the viewport with smooth native scrolling.