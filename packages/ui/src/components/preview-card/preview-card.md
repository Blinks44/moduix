# PreviewCard

Upstream primitive docs: https://base-ui.com/react/components/preview-card.md

## Purpose

`PreviewCard` is the moduix hover-and-focus popup for link previews. Use it when a link should reveal
supporting visual context such as an image, summary, or status snippet without replacing the
destination itself.

Preview cards are a progressive enhancement for sighted pointer and keyboard users. Keep essential
information available in nearby page content or on the linked destination, because touch and screen
reader users may not receive the same preview experience.

## Current behavior contract

- `PreviewCard` is a direct re-export of `PreviewCardPrimitive.Root`. It renders no DOM node and
  preserves the full Base UI controlled/uncontrolled behavior, detached handles, payload render
  function, and trigger ID support.
- `PreviewCardContent` is the default convenience path. It always renders:

  ```text
  PreviewCardContent
  └─ PreviewCardPortal
     └─ PreviewCardPositioner
        └─ PreviewCardPopup
           ├─ PreviewCardArrow (only when showArrow)
           └─ PreviewCardViewport
              └─ children
  ```

- `PreviewCardContent` adds two wrapper defaults:
  - `sideOffset={8}`
  - `showArrow={false}`
- `PreviewCardContent` forwards popup props to `PreviewCardPopup` and the shared popup positioning
  props to `PreviewCardPositioner`.
- `PreviewCardContent` always wraps its children in `PreviewCardViewport`. This is an intentional
  moduix convenience so payload-driven content can adopt viewport transitions later without changing
  structure.
- `PreviewCardContent` does **not** accept portal props such as `keepMounted` or `container`. Switch
  to explicit `PreviewCardPortal` composition when you need them.
- `PreviewCardTrigger` applies the default moduix link styling only when `render` is **not**
  provided. If you replace the rendered element, styling is delegated to that element.
- `PreviewCardBackdrop` is optional and non-interactive by default (`pointer-events: none`). It is a
  visual layer for custom compositions, not a modal dismiss surface.

## Composition

### Recommended anatomy

```tsx
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from 'moduix';

const article = {
  title: 'Typography',
  image: '/images/typography-preview.jpg',
  summary: 'Typography is the art and technique of arranging type.',
  url: 'https://en.wikipedia.org/wiki/Typography',
};

export function PreviewCardDemo() {
  return (
    <PreviewCard>
      <p>
        The principles of good{' '}
        <PreviewCardTrigger href={article.url}>{article.title.toLowerCase()}</PreviewCardTrigger>{' '}
        remain in the digital age.
      </p>
      <PreviewCardContent>
        <article>
          <img src={article.image} alt={`Preview illustration for ${article.title}`} />
          <p>
            <strong>{article.title}</strong>
            <br />
            {article.summary}
          </p>
        </article>
      </PreviewCardContent>
    </PreviewCard>
  );
}
```

### Exported parts

| Part                    | Element         | `data-slot`               | Purpose                                                         |
| ----------------------- | --------------- | ------------------------- | --------------------------------------------------------------- |
| `PreviewCard`           | none            | -                         | Root state, payload, detached-handle, and trigger ID provider.  |
| `PreviewCardTrigger`    | trigger element | `preview-card-trigger`    | Hover/focus trigger, usually rendered as a link.                |
| `PreviewCardContent`    | composition     | -                         | Convenience wrapper for portal + positioner + popup + viewport. |
| `PreviewCardPortal`     | portal          | `preview-card-portal`     | Popup mount target; used internally by `PreviewCardContent`.    |
| `PreviewCardBackdrop`   | `div`           | `preview-card-backdrop`   | Optional visual backdrop for explicit composition.              |
| `PreviewCardPositioner` | `div`           | `preview-card-positioner` | Floating layout and collision-aware positioning layer.          |
| `PreviewCardPopup`      | `div`           | `preview-card-popup`      | Visible popup surface.                                          |
| `PreviewCardArrow`      | `div`           | `preview-card-arrow`      | Default decorative arrow wrapper.                               |
| `PreviewCardViewport`   | `div`           | `preview-card-viewport`   | Inner content wrapper and transition viewport.                  |

### Explicit composition

Use low-level parts when you need a custom arrow, backdrop, portal props, or manual viewport
styling:

```tsx
import styles from './PreviewCard.module.css';
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBackdrop,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
} from 'moduix';

<PreviewCard>
  <PreviewCardTrigger href={article.url}>Preview with custom composition</PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardBackdrop className={styles.backdrop} />
    <PreviewCardPositioner side="right" sideOffset={12}>
      <PreviewCardPopup className={styles.popup}>
        <PreviewCardArrow />
        <PreviewCardViewport className={styles.viewport}>
          <article>
            <img src={article.image} alt={`Preview illustration for ${article.title}`} />
            <p>
              <strong>{article.title}</strong>
              <br />
              {article.summary}
            </p>
          </article>
        </PreviewCardViewport>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>;
```

Use `PreviewCardArrow` directly when you need custom arrow markup. `showArrow` only toggles the
built-in default arrow.

## Public props

### `PreviewCard`

`PreviewCard` re-exports Base UI root props. The wrapper does not add extra root props.

| Prop                   | Type                                   | Default | Notes                                               |
| ---------------------- | -------------------------------------- | ------- | --------------------------------------------------- |
| `defaultOpen`          | `boolean`                              | `false` | Uncontrolled initial open state.                    |
| `open`                 | `boolean`                              | -       | Controlled open state.                              |
| `onOpenChange`         | `(open, details) => void`              | -       | Receives the active trigger in `details.trigger`.   |
| `onOpenChangeComplete` | `(open: boolean) => void`              | -       | Fires after transition lifecycle completes.         |
| `actionsRef`           | `RefObject<{ close; unmount }>`        | -       | Imperative close/unmount escape hatch from Base UI. |
| `handle`               | `PreviewCard.Handle<Payload>`          | -       | Connects detached triggers or external controls.    |
| `triggerId`            | `string \| null`                       | -       | Controlled active trigger for multi-trigger setups. |
| `defaultTriggerId`     | `string \| null`                       | -       | Uncontrolled initial trigger ID.                    |
| `children`             | `ReactNode` or payload render function | -       | Root content or payload-based render function.      |

### `PreviewCardTrigger`

`PreviewCardTrigger` exposes Base UI trigger behavior plus the moduix default link styling when
`render` is omitted.

| Prop         | Type                          | Default | Notes                                                                                |
| ------------ | ----------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `render`     | element or render function    | -       | Replaces the default anchor element. No default trigger class is added in this mode. |
| `delay`      | `number`                      | `600`   | Hover/focus open delay in milliseconds.                                              |
| `closeDelay` | `number`                      | `300`   | Hover close delay in milliseconds.                                                   |
| `disabled`   | `boolean`                     | `false` | Prevents opening.                                                                    |
| `handle`     | `PreviewCard.Handle<Payload>` | -       | Connects detached triggers.                                                          |
| `payload`    | `Payload`                     | -       | Passed through to the root render function.                                          |
| `className`  | string or state callback      | -       | Applied to the rendered trigger element.                                             |

The wrapper preserves the payload generic on `handle` and `payload`, so detached multi-trigger usage
stays type-safe.

### `PreviewCardContent`

`PreviewCardContent` applies popup props to `PreviewCardPopup` and positioning props to
`PreviewCardPositioner`.

| Prop                 | Type                       | Default         | Notes                                                    |
| -------------------- | -------------------------- | --------------- | -------------------------------------------------------- |
| `showArrow`          | `boolean`                  | `false`         | Adds the default `PreviewCardArrow` before the viewport. |
| `side`               | `Side`                     | -               | Floating side.                                           |
| `sideOffset`         | `number \| OffsetFunction` | `8`             | Default spacing between trigger and popup.               |
| `align`              | `Align`                    | -               | Floating alignment.                                      |
| `alignOffset`        | `number \| OffsetFunction` | -               | Alignment offset.                                        |
| `arrowPadding`       | `number`                   | -               | Arrow collision padding.                                 |
| `collisionAvoidance` | `CollisionAvoidance`       | Base UI default | Enables collision-aware repositioning.                   |
| `collisionBoundary`  | boundary or boundaries     | -               | Collision boundary override.                             |
| `collisionPadding`   | padding                    | -               | Collision padding override.                              |
| `className`          | string or state callback   | -               | Styles the visible popup surface, not the viewport.      |

`PreviewCardContent` does **not** accept portal props such as `container` or `keepMounted`. Use
explicit `PreviewCardPortal` composition for that.

### Other exported parts

- `PreviewCardPortal`, `PreviewCardBackdrop`, `PreviewCardPositioner`, `PreviewCardPopup`,
  `PreviewCardArrow`, and `PreviewCardViewport` forward the corresponding Base UI props and add the
  moduix classes plus `data-slot`.
- `PreviewCardArrow` renders the default `PopupArrowIcon` when no children are provided.
- `createPreviewCardHandle` is a direct re-export of `PreviewCardPrimitive.createHandle()`.

## Defaults and styling

Every DOM part accepts `className`. The root `PreviewCard` does not render a DOM node and has no
class.

### State and slot hooks

All exported DOM parts include the `data-slot` values listed above. Base UI also provides state
attributes that the current CSS relies on:

| Part                  | State attributes used by moduix                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| `PreviewCardTrigger`  | `data-popup-open`, `data-disabled`                                                                 |
| `PreviewCardBackdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`                             |
| `PreviewCardPopup`    | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`                             |
| `PreviewCardArrow`    | `data-side`                                                                                        |
| `PreviewCardViewport` | `data-activation-direction`, `data-current`, `data-previous`, `data-transitioning`, `data-instant` |

`PreviewCardPositioner` also receives Base UI positioning state (`data-side`, `data-align`,
`data-anchor-hidden`) plus the runtime layout variables described below.

### Styling contract

- `PreviewCardTrigger` keeps the underline/focus styles only when `render` is omitted.
- `PreviewCardContent className` styles `PreviewCardPopup`, not the portal, positioner, or viewport.
- `PreviewCardPopup` keeps `overflow: visible` so the arrow can render outside the popup edge.
- `PreviewCardViewport` clips overflowing content. If the preview body can exceed the popup size, add
  your own inner scroll container inside the viewport.
- `PreviewCardBackdrop` is visual-only because it has `pointer-events: none`.

### CSS variable contract

#### Wrapper-owned variables

- Trigger:
  - `--preview-card-disabled-opacity`
  - `--preview-card-focus-ring-color`
  - `--preview-card-focus-ring-width`
  - `--preview-card-trigger-color`
  - `--preview-card-trigger-decoration-color`
  - `--preview-card-trigger-decoration-color-hover`
  - `--preview-card-trigger-decoration-color-open`
  - `--preview-card-trigger-decoration-thickness`
  - `--preview-card-trigger-focus-offset`
  - `--preview-card-trigger-focus-radius`
  - `--preview-card-trigger-underline-offset`
- Popup surface:
  - `--preview-card-bg`
  - `--preview-card-border-color`
  - `--preview-card-border-width`
  - `--preview-card-color`
  - `--preview-card-height`
  - `--preview-card-max-height`
  - `--preview-card-max-width`
  - `--preview-card-min-width`
  - `--preview-card-padding-x`
  - `--preview-card-padding-y`
  - `--preview-card-radius`
  - `--preview-card-shadow`
  - `--preview-card-transition`
  - `--preview-card-width`
- Arrow:
  - `--preview-card-arrow-height`
  - `--preview-card-arrow-inline-offset`
  - `--preview-card-arrow-size`
  - `--preview-card-arrow-stroke-color`
  - `--preview-card-arrow-width`
- Backdrop:
  - `--preview-card-backdrop-bg`
  - `--preview-card-backdrop-blur`
  - `--preview-card-backdrop-transition`

`--preview-card-transition` is shared by the trigger and popup transitions.

#### Base UI runtime variables used by the wrapper

- Positioning and sizing: `--positioner-width`, `--positioner-height`, `--available-width`,
  `--available-height`, `--transform-origin`
- Viewport transitions: `--popup-width`, `--popup-height`

These come from Base UI at runtime and are useful when you animate custom positioners, popups, or
viewport transitions.

## Intentional differences from Base UI

- Local docs describe the moduix wrapper, not the entire upstream primitive surface.
- `PreviewCardContent` is the recommended default path; upstream docs focus on low-level part-by-part
  composition.
- `PreviewCardContent` always includes `PreviewCardViewport`, even for single-trigger previews.
- `showArrow` is the shared moduix popup-family sugar for the built-in arrow.
- The trigger ships with moduix link styling by default when `render` is omitted.
- The optional backdrop is visual-only by default and does not create a modal interaction model.

## Agent notes

- Preserve the default `PreviewCardContent` structure unless the user explicitly wants a public API
  change.
- Keep `showArrow` opt-in and reserve custom arrow markup for explicit `PreviewCardArrow`
  composition.
- Do not remove the always-present viewport from `PreviewCardContent` as “cleanup”; it is part of the
  wrapper contract.
- If payload or detached-trigger behavior changes, update stories, docs examples, and this file in
  the same task.

## Motion tokens

`PreviewCardBackdrop` and `PreviewCardPopup` now expose phase-specific motion variables. Override the backdrop `starting/ending-opacity` and `starting/ending-blur` tokens, plus the popup `starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to build fade or slide variants while keeping the default scale-in preview behavior.

## Local changelog

- 2026-06-10: Added phase-specific backdrop and popup motion tokens so preview-card enter/exit motion can be retuned to fade, slide, or mixed effects through CSS variables while preserving the shipped default.
- 2026-06-03: Rewrote the local docs around the actual moduix wrapper contract, documented the
  default `PreviewCardContent` composition and styling hooks, preserved generic payload typing on
  `PreviewCardTrigger`, and clarified that the viewport clips overflowing content while the popup
  keeps arrow overflow visible.