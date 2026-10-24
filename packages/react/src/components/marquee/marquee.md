# Marquee

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/marquee
- Chakra UI: https://chakra-ui.com/docs/components/marquee

`Marquee` continuously scrolls repeated content such as logos, announcements, or featured items.
It is a thin styled wrapper around Ark UI React `@ark-ui/react/marquee`.

## Contract

Consumers compose the tree explicitly; the root renders no viewport, content, items, or edges.

```tsx
import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/react/marquee';

export function Example() {
  return (
    <Marquee aria-label="Partner logos" pauseOnInteraction>
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
          <MarqueeItem>Beacon</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  );
}
```

| Export                | `data-slot`             | Notes                                               |
| --------------------- | ----------------------- | --------------------------------------------------- |
| `Marquee`             | `marquee-root`          | Ark root: pause state, ids, orientation, variables. |
| `MarqueeRootProvider` | `marquee-root-provider` | Root for an external `useMarquee()` instance.       |
| `MarqueeViewport`     | `marquee-viewport`      | Clipping viewport; no moduix styles.                |
| `MarqueeContent`      | `marquee-content`       | Animated content wrapper and cloned content host.   |
| `MarqueeItem`         | `marquee-item`          | Individual item; does not shrink.                   |
| `MarqueeEdge`         | `marquee-edge`          | Optional fade overlay. Requires `side`.             |
| `MarqueeContext`      | -                       | Render-prop consumer for the enclosing marquee.     |
| `useMarquee`          | -                       | Creates state for `MarqueeRootProvider`.            |
| `useMarqueeContext`   | -                       | Reads state from the enclosing marquee.             |

Ark part props, `MarqueePauseStatusDetails`, `MarqueeSide`, and the hook types are re-exported as
types. All props, callbacks, and `asChild` come from Ark unchanged; pause details keep Ark's shape.

Use `MarqueeRootProvider` with `useMarquee()` when controls outside the root call `pause()`,
`resume()`, `togglePause()`, or `restart()`. Do not render `Marquee` and `MarqueeRootProvider` for
the same state instance. Wrap right-to-left content in `LocaleProvider` with an RTL locale.

## Styling

- The root is transparent, inherits the text color, and is `100%` wide. A vertical root
  (`side="top" | "bottom"`) is `15rem` tall so the viewport has a block size; change size with a
  class.
- Content uses the foundation `moduix-marquee-x` and `moduix-marquee-y` keyframes with Ark's
  `--marquee-duration`, `--marquee-delay`, `--marquee-loop-count`, and `--marquee-translate`.
  `data-paused` on the root pauses it; `prefers-reduced-motion: reduce` turns it off in both
  orientations.
- Edges draw a gradient from `--moduix-marquee-edge-color` (default `--moduix-color-background`)
  over `--moduix-marquee-edge-size` (default `20%`), mirrored for `dir="rtl"`, with `z-index: 1`.
- Ark sets root `position`, `overflow`, and flex layout, the viewport main-axis size, content
  layout, and edge position and `pointer-events` inline. The CSS does not repeat them.

## Accessibility

Ark renders `role="region"` with `aria-roledescription="marquee"` and hides cloned content.
Pass a descriptive `aria-label` or `translations.root`. With `pauseOnInteraction`, hover and focus
pause the marquee. There is no keyboard navigation.

## Agent notes

- Keep the wrapper thin: no automatic structure, prop aliases, or local playback state.
- Keep item visuals and framed surfaces in consumer CSS, stories, and docs examples.
- Keep keyframes in foundation `animations.css`, shared by CSS Modules and Tailwind.
- The Tailwind root sets `h-60` from `side` (or the provider orientation) instead of a
  `data-orientation` variant so a consumer height class replaces it through `tailwind-merge`.