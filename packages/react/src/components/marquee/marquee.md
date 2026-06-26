# Marquee

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/marquee
- Zag API: https://zagjs.com/api/mdx/components/react/marquee

## Purpose

`Marquee` continuously scrolls repeated content such as logos, announcements, or featured items.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/marquee`. Preserve the Ark parts exactly: `Root`,
`RootProvider`, `Viewport`, `Content`, `Item`, `Edge`, and `Context`.

Ark owns pause state, orientation, side, auto-fill cloning, loop counts, ids, localized root labels,
and the imperative API returned by `useMarquee()`. CSS supplies the keyframe animation that consumes
Ark CSS variables.

## Current behavior contract

`Marquee` is the styled root and is equivalent to `Marquee.Root`. It does not render viewport,
content, items, or edge fades automatically. Consumers compose the Ark tree explicitly:

```tsx
import { Marquee } from '@moduix/react';

export function Example() {
  return (
    <Marquee aria-label="Partner logos" pauseOnInteraction>
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item>Atlas</Marquee.Item>
          <Marquee.Item>Beacon</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>
  );
}
```

The package exports `Marquee`, `useMarquee`, `useMarqueeContext`, and Ark-aligned public types from
`@ark-ui/react/marquee`.

## Anatomy and exported parts

```text
Marquee / Marquee.Root
├─ Marquee.Edge[side?]
├─ Marquee.Viewport
│  └─ Marquee.Content
│     └─ Marquee.Item
└─ Marquee.Edge[side?]
```

| Export                     | `data-slot`             | Notes                                                   |
| -------------------------- | ----------------------- | ------------------------------------------------------- |
| `Marquee` / `Marquee.Root` | `marquee-root`          | Ark root, pause state, ids, orientation, and variables. |
| `Marquee.RootProvider`     | `marquee-root-provider` | Root for an external `useMarquee()` instance.           |
| `Marquee.Viewport`         | `marquee-viewport`      | Clipping viewport.                                      |
| `Marquee.Content`          | `marquee-content`       | Animated content wrapper and cloned content host.       |
| `Marquee.Item`             | `marquee-item`          | Individual marquee item.                                |
| `Marquee.Edge`             | `marquee-edge`          | Optional fade overlay. Requires `side`.                 |
| `Marquee.Context`          | -                       | Render-prop access to the current marquee API.          |

No flat part aliases such as `MarqueeRoot` or `MarqueeViewport` are exported.

## Composition

Use `pauseOnInteraction` for readable or interactive content, `autoFill` when the item set is
shorter than the viewport, and `side="top" | "bottom"` for vertical marquees.

```tsx
<Marquee aria-label="Partner logos" autoFill pauseOnInteraction spacing="2rem">
  <Marquee.Edge side="start" />
  <Marquee.Viewport>
    <Marquee.Content>
      {items.map((item) => (
        <Marquee.Item key={item.name}>{item.name}</Marquee.Item>
      ))}
    </Marquee.Content>
  </Marquee.Viewport>
  <Marquee.Edge side="end" />
</Marquee>
```

Use `Marquee.RootProvider` with `useMarquee()` when controls outside the root need to call
`pause()`, `resume()`, `togglePause()`, or `restart()`. Do not render `Marquee` and
`Marquee.RootProvider` for the same state instance.

## Upstream feature coverage

- Basic: supported through explicit `Marquee` / `Viewport` / `Content` / `Item` composition.
- Auto fill: supported through `autoFill` and `spacing`.
- Reverse: supported through `reverse`.
- Vertical: supported through `side="top"` or `side="bottom"`.
- Speed and delay: supported through `speed` and `delay`.
- Pause on interaction: supported through `pauseOnInteraction`, hover, and focus.
- Programmatic control: supported through exported `useMarquee` and `Marquee.RootProvider`.
- Finite loops: supported through `loopCount`, `onLoopComplete`, and `onComplete`.
- Edge fades: supported through `Marquee.Edge side="start|end|top|bottom"`.
- `asChild`: preserved on all Ark parts.
- `ids`: preserved on the root for stable root, viewport, and content IDs.
- `Marquee.Context` and `useMarqueeContext`: exported for state reads inside the tree.

## Props and callbacks

| Prop or callback     | Notes                                                         |
| -------------------- | ------------------------------------------------------------- |
| `side`               | `start`, `end`, `top`, or `bottom`; top/bottom are vertical.  |
| `speed`              | Pixels per second; Ark calculates duration from content size. |
| `spacing`            | Gap between content instances and items.                      |
| `delay`              | Delay before animation starts, in seconds.                    |
| `loopCount`          | Number of loops; `0` means infinite loops.                    |
| `autoFill`           | Duplicates content until the viewport is filled.              |
| `pauseOnInteraction` | Pauses on hover and focus. Recommended for readable content.  |
| `reverse`            | Reverses animation direction without changing `side`.         |
| `defaultPaused`      | Initial uncontrolled pause state.                             |
| `paused`             | Controlled pause state. Pair with `onPauseChange`.            |
| `onPauseChange`      | Receives Ark pause status details.                            |
| `onLoopComplete`     | Fires after each loop iteration.                              |
| `onComplete`         | Fires after the final loop when `loopCount` is finite.        |
| `translations`       | Localized root label. Use this or `aria-label`.               |
| `ids`                | Stable ids for root, viewport, and content instances.         |
| `asChild`            | Preserved on every Ark part for host element replacement.     |
| `Marquee.Edge side`  | Required edge side: `start`, `end`, `top`, or `bottom`.       |
| `RootProvider.value` | Required `UseMarqueeReturn` from `useMarquee()`.              |

## Accessibility and state

Ark provides `role="region"` with `aria-roledescription="marquee"`, hides cloned content from
assistive technologies, and exposes a localized root label through `translations.root`. Consumers
should pass a descriptive `aria-label` or `translations.root`.

Relevant Ark attributes and variables:

| Target   | Attribute or variable                                                                  | Meaning                                  |
| -------- | -------------------------------------------------------------------------------------- | ---------------------------------------- |
| Root     | `data-state="paused" \| "idle"`, `data-paused`, `data-orientation`                     | Playback and orientation state.          |
| Viewport | `data-orientation`, `data-side`                                                        | Layout orientation and scroll side.      |
| Content  | `data-index`, `data-orientation`, `data-side`, `data-reverse`, `data-clone`            | Animation direction and clone identity.  |
| Item     | `data-scope="marquee"`, `data-part="item"`                                             | Individual item styling hook.            |
| Edge     | `data-side`, `data-orientation`                                                        | Fade side and orientation.               |
| Root     | `--marquee-duration`, `--marquee-delay`, `--marquee-loop-count`, `--marquee-translate` | Animation values consumed by CSS.        |
| Root     | `--marquee-spacing`                                                                    | Spacing between content instances/items. |

`paused` with `onPauseChange(details)` is the controlled playback path. `defaultPaused` sets the
initial uncontrolled state. Refs forward to the actual Ark DOM part for every wrapped part.

There is no roving focus or arrow-key navigation. When `pauseOnInteraction` is enabled, focus pauses
the marquee and blur resumes it.

## Defaults and styling

Moduix adds default classes, `data-slot` hooks, CSS variables, edge fade styles, reduced-motion
handling, and the required keyframe animations. The root is transparent by default: no border,
background, padding, or radius is applied unless consumers add those styles with `className`. Ark
supplies layout props, state attributes, clones, and runtime CSS variables.

Primary CSS variables:

| Variable                    | Default                            |
| --------------------------- | ---------------------------------- |
| `--marquee-width`           | `100%`                             |
| `--marquee-height`          | `auto`                             |
| `--marquee-vertical-height` | `15rem`                            |
| `--marquee-color`           | `var(--color-foreground)`          |
| `--marquee-edge-size`       | `20%`                              |
| `--marquee-edge-color`      | `var(--color-background)`          |
| `--marquee-edge-z-index`    | `1`                                |
| `--marquee-delay`           | from `delay` (`0s`)                |
| `--marquee-duration`        | from content size + `speed` (`50`) |
| `--marquee-loop-count`      | from `loopCount` (`0` = infinite)  |
| `--marquee-spacing`         | from `spacing` (`1rem`)            |
| `--marquee-translate`       | from measured size + `side`        |

The CSS applies `marquee-x` for inline scrolling and `marquee-y` for vertical scrolling. It pauses
content animation when Ark sets `data-paused` on the root and disables animation for
`prefers-reduced-motion: reduce`.

## Intentional sugar and differences from upstream

- Moduix adds minimal behavioral styling, CSS variables, and stable `data-slot` hooks.
- Moduix keeps the root visually neutral by default; framed surfaces belong in consumer CSS,
  stories, or docs examples.
- Moduix does not copy Ark demo item styles into the component; item visuals belong to consumers,
  stories, or docs examples.
- Moduix does not add convenience wrappers, prop aliases, or local state around Ark playback.
- `Marquee` remains the short root import for docs ergonomics and has attached Ark parts.

## Agent notes

- Keep the wrapper thin. Do not add automatic structural rendering for viewport/content/items.
- Keep keyframe names local to the CSS module and tied to Ark `--marquee-translate`.
- Keep pause callbacks and controlled state detail objects in Ark's original shape.
- If Ark adds new public provider/context hooks or types, mirror them through `Marquee.tsx` and
  `index.ts`.

## Local changelog

- 2026-06-22: Added `Marquee` as an Ark UI-backed component with root shortcut, provider/context
  support, required animation CSS, edge fade styling, stories, local docs, public exports, docs
  examples, and registry metadata.
- 2026-06-22: Kept the default root visually neutral and moved framed demo treatment to custom
  styling examples.
- 2026-06-26: Audited the Ark migration, documented the full prop/callback surface and data
  attributes, and aligned stories with the official Ark example set.