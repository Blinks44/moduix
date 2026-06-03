# Popover

Upstream primitive docs: https://base-ui.com/react/components/popover.md

## Purpose

`Popover` is the moduix floating popup for compact contextual content anchored to a trigger. Use it
for short summaries, quick actions, lightweight forms, and status details that should stay attached
to a specific control.

Use `Dialog` instead when the content needs a dedicated overlay workflow, a large surface, or a
backdrop by default.

## Current behavior contract

- `Popover` is a direct re-export of `PopoverPrimitive.Root`. It renders no DOM element and keeps the
  full Base UI controlled/uncontrolled behavior.
- `PopoverContent` is the default convenience path. It always renders:

  ```text
  PopoverContent
  └─ PopoverPortal
     └─ PopoverPositioner
        └─ PopoverPopup
           ├─ PopoverArrow (only when showArrow)
           └─ children
  ```

- `PopoverContent` does **not** render `PopoverBackdrop` or `PopoverViewport`. Those stay explicit
  composition parts.
- `PopoverContent` adds two wrapper defaults:
  - `sideOffset={8}`
  - `showArrow={false}`
- `PopoverTrigger` applies the moduix trigger class only when `render` is **not** provided. If you
  replace the element with `render`, styling is delegated to the rendered element.
- `PopoverClose` always keeps the moduix close-button class, even when `render` is provided. This is
  consistent with other dialog-like close actions in the library.
- `PopoverViewport` is an advanced inner wrapper for panel-style transitions. It is not the default
  content wrapper and is not intended as a generic scroll container.

## Composition

### Recommended anatomy

```tsx
import {
  Button,
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from 'moduix';

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Invite teammates</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Invite teammates</PopoverTitle>
          <PopoverDescription>Share access without leaving the current page.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody>{/* compact form or status details */}</PopoverBody>
        <PopoverFooter>
          <PopoverClose>Done</PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
```

### Exported parts

| Part                 | Element         | `data-slot`           | Purpose                                                |
| -------------------- | --------------- | --------------------- | ------------------------------------------------------ |
| `Popover`            | none            | -                     | Root state and interaction provider.                   |
| `PopoverTrigger`     | trigger element | `popover-trigger`     | Opens and closes the popup.                            |
| `PopoverContent`     | composition     | -                     | Convenience wrapper for portal + positioner + popup.   |
| `PopoverPortal`      | portal          | `popover-portal`      | Mount target for popup content.                        |
| `PopoverBackdrop`    | `div`           | `popover-backdrop`    | Optional backdrop for explicit composition.            |
| `PopoverPositioner`  | `div`           | `popover-positioner`  | Floating layout and collision-aware positioning layer. |
| `PopoverPopup`       | `div`           | `popover-popup`       | Visible popup surface.                                 |
| `PopoverViewport`    | `div`           | `popover-viewport`    | Advanced inner viewport for panel transitions.         |
| `PopoverArrow`       | `div`           | `popover-arrow`       | Default decorative arrow wrapper.                      |
| `PopoverTitle`       | heading         | `popover-title`       | Accessible popup label.                                |
| `PopoverDescription` | text            | `popover-description` | Accessible supporting description.                     |
| `PopoverHeader`      | `div`           | `popover-header`      | Layout wrapper for title and description.              |
| `PopoverBody`        | `div`           | `popover-body`        | Optional free-form body region.                        |
| `PopoverFooter`      | `div`           | `popover-footer`      | Optional action row.                                   |
| `PopoverClose`       | close element   | `popover-close`       | Built-in dismiss action.                               |

### Explicit composition

Use low-level parts when you need a backdrop, portal props, a custom arrow, or a viewport:

```tsx
<Popover>
  <PopoverTrigger render={<Button />}>Open custom popover</PopoverTrigger>
  <PopoverPortal keepMounted>
    <PopoverBackdrop className={styles.backdrop} />
    <PopoverPositioner side="right" sideOffset={8}>
      <PopoverPopup className={styles.popup}>
        <PopoverArrow />
        <PopoverViewport>{children}</PopoverViewport>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
</Popover>
```

`PopoverViewport` is only useful when the inner content is structured around `data-current`,
`data-previous`, and `data-activation-direction` transitions. Do not use it as a generic inner
wrapper for ordinary static content.

## Public props

### `Popover`

`Popover` re-exports Base UI root props. The wrapper does not add extra root props.

| Prop                   | Type                                   | Default | Notes                                            |
| ---------------------- | -------------------------------------- | ------- | ------------------------------------------------ |
| `defaultOpen`          | `boolean`                              | `false` | Uncontrolled initial state.                      |
| `open`                 | `boolean`                              | -       | Controlled open state.                           |
| `onOpenChange`         | `(open, details) => void`              | -       | State change callback.                           |
| `onOpenChangeComplete` | `(open: boolean) => void`              | -       | Fires after transition lifecycle completes.      |
| `modal`                | `boolean \| "trap-focus"`              | `false` | Enables modal or focus-trapped behavior.         |
| `handle`               | `Popover.Handle<Payload>`              | -       | Connects detached triggers or external controls. |
| `children`             | `ReactNode` or payload render function | -       | Root content.                                    |

### `PopoverTrigger`

`PopoverTrigger` exposes Base UI trigger behavior plus the moduix default trigger styling when
`render` is omitted.

| Prop           | Type                       | Default | Notes                                                                     |
| -------------- | -------------------------- | ------- | ------------------------------------------------------------------------- |
| `render`       | element or render function | -       | Replaces the DOM element. No default trigger class is added in this mode. |
| `nativeButton` | `boolean`                  | `true`  | Set to `false` when the rendered element is not a real button.            |
| `openOnHover`  | `boolean`                  | `false` | Enables delayed hover-open behavior.                                      |
| `delay`        | `number`                   | `300`   | Hover open delay in milliseconds.                                         |
| `closeDelay`   | `number`                   | `0`     | Hover close delay in milliseconds.                                        |
| `disabled`     | `boolean`                  | `false` | Prevents opening.                                                         |
| `handle`       | `Popover.Handle<Payload>`  | -       | Connects detached triggers.                                               |
| `payload`      | `Payload`                  | -       | Payload passed through Base UI trigger interactions.                      |
| `className`    | string or state callback   | -       | Applied to the rendered trigger element.                                  |

### `PopoverContent`

`PopoverContent` applies popup props to `PopoverPopup` and positioning props to `PopoverPositioner`.

| Prop                 | Type                     | Default         | Notes                                                      |
| -------------------- | ------------------------ | --------------- | ---------------------------------------------------------- |
| `showArrow`          | `boolean`                | `false`         | Adds the default `PopoverArrow` before the popup children. |
| `side`               | `Side`                   | -               | Floating side.                                             |
| `sideOffset`         | `number`                 | `8`             | Default spacing between trigger and popup.                 |
| `align`              | `Align`                  | -               | Floating alignment.                                        |
| `alignOffset`        | `number`                 | -               | Alignment offset.                                          |
| `arrowPadding`       | `number`                 | -               | Arrow collision padding.                                   |
| `collisionAvoidance` | `boolean`                | Base UI default | Enables collision-aware repositioning.                     |
| `collisionBoundary`  | boundary or boundaries   | -               | Collision boundary override.                               |
| `collisionPadding`   | padding                  | -               | Collision padding override.                                |
| `initialFocus`       | Base UI popup prop       | -               | Focus target on open.                                      |
| `finalFocus`         | Base UI popup prop       | -               | Focus target on close.                                     |
| `className`          | string or state callback | -               | Styles the visible popup surface.                          |

`PopoverContent` does **not** accept portal-level props such as `keepMounted` or `container`. Switch
to explicit `PopoverPortal` composition when you need them.

### Other exported parts

- `PopoverPortal`, `PopoverBackdrop`, `PopoverPositioner`, `PopoverPopup`, `PopoverViewport`,
  `PopoverArrow`, `PopoverTitle`, and `PopoverDescription` forward the corresponding Base UI part
  props and add moduix classes plus `data-slot`.
- `PopoverHeader`, `PopoverBody`, and `PopoverFooter` are plain `div` layout wrappers.
- `PopoverClose` forwards Base UI close props and keeps the moduix control styling.
- `createPopoverHandle` is a direct re-export of `PopoverPrimitive.createHandle()`.

## Defaults and styling

Every DOM part accepts `className`. The root `Popover` does not render a DOM node and has no class.

### State and slot hooks

All exported DOM parts include the `data-slot` values listed above. Base UI also provides state
attributes that the current CSS relies on:

| Part              | State attributes used by moduix                                        |
| ----------------- | ---------------------------------------------------------------------- |
| `PopoverTrigger`  | `data-popup-open`, `data-disabled`                                     |
| `PopoverBackdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style` |
| `PopoverPopup`    | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style` |
| `PopoverArrow`    | `data-side`                                                            |
| `PopoverViewport` | `data-current`, `data-previous`, `data-activation-direction`           |
| `PopoverClose`    | `data-disabled`                                                        |

### Styling contract

- `PopoverContent className` styles `PopoverPopup`, not the portal or positioner.
- `PopoverTrigger` and `PopoverClose` share the same control token family:
  `--popover-control-*`.
- `PopoverPopup` keeps `overflow: visible` so the arrow can render outside the popup edge.
- `PopoverViewport` uses `overflow: clip`, not `overflow: auto`.

If the popup can become taller than the default max height, add a scrollable inner container inside
`PopoverBody` or override the popup styles yourself:

```tsx
<PopoverContent className={styles.popup}>
  <PopoverBody className={styles.scrollArea}>{/* tall content */}</PopoverBody>
</PopoverContent>
```

```css
.popup {
  --popover-max-height: 32rem;
}

.scrollArea {
  max-height: 24rem;
  overflow: auto;
}
```

### CSS variables

#### Trigger and close controls

| Variable                         | Default/fallback                                              |
| -------------------------------- | ------------------------------------------------------------- |
| `--popover-control-height`       | `var(--size-lg)`                                              |
| `--popover-control-padding-y`    | `0.5rem`                                                      |
| `--popover-control-padding-x`    | `0.875rem`                                                    |
| `--popover-control-border-width` | `var(--border-width-sm)`                                      |
| `--popover-control-border-color` | `var(--color-border)`                                         |
| `--popover-control-radius`       | `var(--radius-md)`                                            |
| `--popover-control-bg`           | `var(--color-background)`                                     |
| `--popover-control-bg-hover`     | `var(--color-accent)`                                         |
| `--popover-control-bg-active`    | `var(--popover-control-bg-hover)`                             |
| `--popover-control-color`        | `var(--color-foreground)`                                     |
| `--popover-control-font-size`    | `var(--text-md)`                                              |
| `--popover-control-line-height`  | `var(--line-height-text-md)`                                  |
| `--popover-focus-ring-width`     | `var(--popover-control-border-width, var(--border-width-sm))` |
| `--popover-focus-ring-color`     | `var(--color-ring)`                                           |
| `--popover-disabled-opacity`     | `var(--opacity-disabled)`                                     |
| `--popover-transition`           | `var(--transition-default)`                                   |

#### Popup surface

| Variable                 | Default/fallback                  |
| ------------------------ | --------------------------------- |
| `--popover-width`        | `auto`                            |
| `--popover-height`       | `auto`                            |
| `--popover-min-width`    | `16rem`                           |
| `--popover-max-width`    | `28rem`                           |
| `--popover-max-height`   | `24rem`                           |
| `--popover-padding-y`    | `1rem`                            |
| `--popover-padding-x`    | `1rem`                            |
| `--popover-radius`       | `var(--radius-md)`                |
| `--popover-bg`           | `var(--color-popover)`            |
| `--popover-color`        | `var(--color-popover-foreground)` |
| `--popover-border-width` | `var(--border-width-sm)`          |
| `--popover-border-color` | `var(--color-border)`             |
| `--popover-shadow`       | `var(--shadow-lg)`                |
| `--popover-scale`        | `var(--scale-popup)`              |

#### Backdrop and arrow

| Variable                        | Default/fallback                                   |
| ------------------------------- | -------------------------------------------------- |
| `--popover-backdrop-bg`         | `var(--backdrop-bg, var(--color-overlay))`         |
| `--popover-backdrop-blur`       | `4px`                                              |
| `--popover-backdrop-transition` | `var(--transition-default)`                        |
| `--popover-arrow-size`          | `8px`                                              |
| `--popover-arrow-inline-offset` | `13px`                                             |
| `--popover-arrow-width`         | `1.25rem`                                          |
| `--popover-arrow-height`        | `0.625rem`                                         |
| `--popover-arrow-stroke-color`  | `var(--popover-border-color, var(--color-border))` |

#### Text and layout

| Variable                            | Default/fallback                                        |
| ----------------------------------- | ------------------------------------------------------- |
| `--popover-title-color`             | `var(--popover-color, var(--color-popover-foreground))` |
| `--popover-title-font-size`         | `var(--text-md)`                                        |
| `--popover-title-font-weight`       | `var(--weight-semibold)`                                |
| `--popover-title-line-height`       | `var(--line-height-text-md)`                            |
| `--popover-description-color`       | `var(--color-muted-foreground)`                         |
| `--popover-description-font-size`   | `var(--text-sm)`                                        |
| `--popover-description-line-height` | `var(--line-height-text-sm)`                            |
| `--popover-description-margin`      | `0`                                                     |
| `--popover-header-gap`              | `var(--spacing-1)`                                      |
| `--popover-body-margin`             | `0`                                                     |
| `--popover-footer-justify`          | `flex-end`                                              |
| `--popover-footer-gap`              | `var(--spacing-2)`                                      |
| `--popover-footer-margin`           | `var(--spacing-3) 0 0`                                  |
| `--popover-viewport-offset`         | `1rem`                                                  |
| `--popover-viewport-transition`     | `220ms`                                                 |

## UX and accessibility

- `PopoverTitle` and `PopoverDescription` wire the popup label and description for assistive
  technology when they are rendered inside the active popup.
- `Esc` and outside interactions request close through Base UI unless prevented in
  `onOpenChange`.
- `modal={true}` blocks outside pointer interaction and locks the user into the popup flow.
- `modal="trap-focus"` traps focus but still allows outside pointer interaction.
- When using `modal={true}` or `modal="trap-focus"`, keep a `PopoverClose` action inside the popup
  so keyboard and touch screen reader users always have an escape path.
- Use `initialFocus` and `finalFocus` on `PopoverContent` when the popup contains inputs or needs a
  deliberate focus target.
- When rendering a non-button trigger via `render`, you are responsible for matching button
  semantics and keyboard behavior. Prefer `render={<Button />}` or another real button-like control.
- The default arrow is decorative. If you replace its children, keep custom arrow content
  non-interactive.

## Intentional differences from Base UI

- Consumers import named parts from `moduix`; this wrapper does not expose the upstream
  `Popover.Root` dot-notation API.
- `PopoverContent` is intentionally narrower than the full primitive surface. Portal, backdrop, and
  viewport concerns stay in explicit composition.
- `showArrow` and `sideOffset={8}` are the only wrapper-level DX sugar on the default content path.
- Trigger styling is opinionated only for the default trigger element. `render` opts out of those
  trigger styles on purpose.
- moduix adds layout helpers (`PopoverHeader`, `PopoverBody`, `PopoverFooter`) and a CSS-variable
  styling contract that do not exist in upstream Base UI.

## Agent notes

- Do not add `PopoverViewport` to `PopoverContent`. That would change the DOM structure, clip
  content unexpectedly, and misuse the viewport as a generic wrapper.
- Keep `PopoverPopup` overflow visible unless the arrow contract changes. The arrow positioning
  relies on rendering outside the popup edge.
- `PopoverTrigger` intentionally skips default trigger styles when `render` is provided. This is a
  real public contract and should stay documented.
- `PopoverContent` does not pass through portal props like `keepMounted` or `container`. That is a
  deliberate boundary between the convenience wrapper and explicit composition.
- `PopoverViewport` is for animated multi-panel content, not a scroll area. Use an inner wrapper
  with `overflow: auto` for tall content instead.

## Local changelog

- Replaced the previous upstream Base UI copy with moduix-native documentation that describes the
  shipped wrapper API, styling hooks, hidden constraints, and recommended composition paths.