# Marquee (Solid)

`Marquee` continuously scrolls repeated content such as logos, announcements, or featured items.
This component is the moduix Solid wrapper around Ark UI Solid Marquee.

## Composition

```tsx
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeViewport,
} from '@moduix/solid/marquee';

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

`Marquee` is the styled root. Consumers compose `MarqueeRootProvider`, `MarqueeViewport`,
`MarqueeContent`, `MarqueeItem`, and `MarqueeEdge` explicitly. Ark owns pause state,
orientation, side, auto-fill cloning, loop counts, ids, localized labels, and the imperative API.

Use `autoFill` and `spacing` when the item set is shorter than the viewport. Use `side="top"` or
`side="bottom"` for vertical marquees, and wrap right-to-left content in `LocaleProvider`.

```tsx
<Marquee aria-label="Partner logos" autoFill spacing="2rem">
  <MarqueeEdge side="start" />
  <MarqueeViewport>
    <MarqueeContent>
      <MarqueeItem>Atlas</MarqueeItem>
      <MarqueeItem>Beacon</MarqueeItem>
    </MarqueeContent>
  </MarqueeViewport>
  <MarqueeEdge side="end" />
</Marquee>
```

## Public API

The package exports `Marquee`, `MarqueeRootProvider`, `MarqueeViewport`, `MarqueeContent`,
`MarqueeItem`, `MarqueeEdge`, `MarqueeContext`, `useMarquee`, and `useMarqueeContext` as flat
values.

| Export                     | `data-slot`             | Notes                                         |
| -------------------------- | ----------------------- | --------------------------------------------- |
| `Marquee`                 | `marquee-root`          | Ark root and playback state.                  |
| `MarqueeRootProvider`     | `marquee-root-provider` | Root for an external `useMarquee()` instance. |
| `MarqueeViewport`         | `marquee-viewport`      | Clipping viewport.                            |
| `MarqueeContent`          | `marquee-content`       | Animated content and cloned content host.     |
| `MarqueeItem`             | `marquee-item`          | Individual marquee item.                      |
| `MarqueeEdge`             | `marquee-edge`          | Optional fade overlay.                        |
| `MarqueeContext`          | -                       | Advanced context consumer.                    |

Supported root props include `side`, `speed`, `spacing`, `delay`, `loopCount`, `autoFill`,
`pauseOnInteraction`, `reverse`, `defaultPaused`, `paused`, `onPauseChange`, `onLoopComplete`,
`onComplete`, `translations`, `ids`, and `asChild`. `MarqueeEdge` requires a `side` of `start`,
`end`, `top`, or `bottom`.

## Programmatic control

`useMarquee()` returns a Solid accessor. Pass it to `MarqueeRootProvider` when controls need to call
`pause()`, `resume()`, `togglePause()`, or `restart()`.

```tsx
function ProviderMarquee() {
  const marquee = useMarquee({ translations: { root: 'Partner logos' } });

  return (
    <MarqueeRootProvider value={marquee}>
      <button type="button" onClick={() => marquee().pause()}>
        Pause
      </button>
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </MarqueeRootProvider>
  );
}
```

`useMarqueeContext()` also returns an accessor. Its value exposes the Ark API and current
`paused`, `orientation`, `side`, `multiplier`, and `contentCount` state.

## Accessibility and styling

Ark provides `role="region"` with `aria-roledescription="marquee"`, hides cloned content from
assistive technologies, and exposes a localized root label through `translations.root`. Consumers
should pass a descriptive `aria-label` or `translations.root`.

The wrapper adds CSS Modules, stable `data-slot` hooks, edge fade variables, and horizontal and
vertical keyframe animations. It preserves Ark's `data-scope`, `data-part`, `data-state`,
`data-orientation`, `data-side`, `data-index`, `data-paused`, `data-reverse`, and `data-clone`
attributes and the `--marquee-duration`, `--marquee-delay`, `--marquee-loop-count`,
`--marquee-spacing`, and `--marquee-translate` variables.

The root is visually neutral by default. Consumer styles control item appearance and framed
surfaces. Reduced motion disables content animation while keeping the content available.

Solid uses a render-function `asChild` prop:

```tsx
<Marquee asChild={(props) => <section {...props()} aria-label="Partner logos" />} />
```

The installed Ark Solid primitive does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths.

The old compound shape is not exported. Use the family-prefixed values shown in the table.
