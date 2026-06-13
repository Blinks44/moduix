# Tooltip

Upstream primitive docs: https://base-ui.com/react/components/tooltip.md

## Purpose

`Tooltip` is the moduix floating hint for short, non-essential text tied to a trigger. Use it for
visual labels, compact explanations, and quick contextual hints that should appear on hover or
focus.

Use `Popover` or `PreviewCard` instead when the popup needs interactive content, rich layout, or a
surface that users are expected to move the pointer into.

## Current behavior contract

- `Tooltip` is a direct re-export of `TooltipPrimitive.Root`. It renders no DOM element and keeps the
  full Base UI controlled/uncontrolled behavior.
- `TooltipProvider` is a direct re-export of `TooltipPrimitive.Provider`. It shares tooltip timing
  across nearby triggers so adjacent tooltips can open instantly after one has just closed.
- `TooltipContent` is the default convenience path. It always renders:

  ```text
  TooltipContent
  └─ TooltipPortal
     └─ TooltipPositioner
        └─ TooltipPopup
           ├─ TooltipArrow (only when showArrow)
           └─ TooltipViewport
              └─ children
  ```

- `TooltipContent` adds two wrapper defaults:
  - `sideOffset={8}`
  - `showArrow={false}`
- `TooltipContent className` styles `TooltipPopup`, not the portal, positioner, or viewport.
- `TooltipTrigger` applies the moduix trigger class only when `render` is **not** provided. If you
  replace the element with `render`, trigger styling is delegated to the rendered element.
- Unlike `PopoverContent`, `TooltipContent` always wraps children in `TooltipViewport`. This is an
  intentional part of the local contract because tooltips support payload-driven content switching
  and viewport transition hooks by default.
- `TooltipViewport` is not a generic scroll container. It is the inner wrapper used for tooltip
  content and transition state.

## Composition

### Recommended anatomy

```tsx
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'moduix';

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button />} aria-label="Notifications">
        Notifications
      </TooltipTrigger>
      <TooltipContent>Notifications</TooltipContent>
    </Tooltip>
  );
}
```

### Exported parts

| Part                  | Element         | `data-slot`          | Purpose                                                |
| --------------------- | --------------- | -------------------- | ------------------------------------------------------ |
| `Tooltip`             | none            | -                    | Root state and interaction provider.                   |
| `TooltipProvider`     | none            | -                    | Shared timing group for nearby tooltips.               |
| `TooltipTrigger`      | trigger element | `tooltip-trigger`    | Opens and closes the tooltip.                          |
| `TooltipContent`      | composition     | -                    | Convenience wrapper for the default popup structure.   |
| `TooltipPortal`       | portal          | `tooltip-portal`     | Mount target for tooltip content.                      |
| `TooltipPositioner`   | `div`           | `tooltip-positioner` | Floating layout and collision-aware positioning layer. |
| `TooltipPopup`        | `div`           | `tooltip-popup`      | Visible tooltip surface.                               |
| `TooltipArrow`        | `div`           | `tooltip-arrow`      | Decorative arrow wrapper with a default SVG.           |
| `TooltipViewport`     | `div`           | `tooltip-viewport`   | Inner content wrapper and transition viewport.         |
| `createTooltipHandle` | helper          | -                    | Connects detached triggers and payload-driven roots.   |

### Explicit composition

Use low-level parts when you need portal props, positioner styling, a custom arrow, or direct
control over the popup/viewport split:

```tsx
import {
  Button,
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
  TooltipViewport,
} from 'moduix';

export function CustomTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button />} aria-label="Custom styled tooltip">
        Custom style
      </TooltipTrigger>
      <TooltipPortal keepMounted>
        <TooltipPositioner sideOffset={10} className={styles.positioner}>
          <TooltipPopup className={styles.popup}>
            <TooltipArrow className={styles.arrow} />
            <TooltipViewport className={styles.viewport}>
              Styled through explicit parts
            </TooltipViewport>
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  );
}
```

### Detached and payload-driven tooltips

`createTooltipHandle()` is the tooltip-specific escape hatch for detached triggers or one tooltip
shared across multiple controls:

```tsx
import { useMemo } from 'react';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  createTooltipHandle,
} from 'moduix';

export function SharedTooltipDemo() {
  const tooltipHandle = useMemo(() => createTooltipHandle<{ text: string }>(), []);

  return (
    <TooltipProvider delay={250}>
      <div>
        <TooltipTrigger
          handle={tooltipHandle}
          payload={{ text: 'Create' }}
          render={<Button variant="ghost" size="icon-md" />}
          aria-label="Create"
        >
          Create
        </TooltipTrigger>
        <TooltipTrigger
          handle={tooltipHandle}
          payload={{ text: 'Share' }}
          render={<Button variant="ghost" size="icon-md" />}
          aria-label="Share"
        >
          Share
        </TooltipTrigger>

        <Tooltip handle={tooltipHandle}>
          {({ payload }) => <TooltipContent>{payload?.text}</TooltipContent>}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

## Public props

### `Tooltip`

`Tooltip` re-exports Base UI root props. The wrapper does not add extra root props.

| Prop                    | Type                                   | Default  | Notes                                                                 |
| ----------------------- | -------------------------------------- | -------- | --------------------------------------------------------------------- |
| `defaultOpen`           | `boolean`                              | `false`  | Uncontrolled initial open state.                                      |
| `open`                  | `boolean`                              | -        | Controlled open state.                                                |
| `onOpenChange`          | `(open, details) => void`              | -        | State change callback.                                                |
| `onOpenChangeComplete`  | `(open: boolean) => void`              | -        | Fires after transition lifecycle completes.                           |
| `disableHoverablePopup` | `boolean`                              | `false`  | When `true`, entering the popup does not keep it open.                |
| `trackCursorAxis`       | `'none' \| 'x' \| 'y' \| 'both'`       | `'none'` | Makes the tooltip follow the cursor axis instead of staying anchored. |
| `actionsRef`            | `RefObject<{ close(); unmount(); }>`   | -        | Imperative close/unmount handle from Base UI.                         |
| `disabled`              | `boolean`                              | `false`  | Disables the whole tooltip root.                                      |
| `handle`                | `TooltipHandle<Payload>`               | -        | Connects detached triggers or shared payload-driven tooltips.         |
| `triggerId`             | `string \| null`                       | -        | Controlled link to the active trigger.                                |
| `defaultTriggerId`      | `string \| null`                       | -        | Initial trigger association for initially open tooltips.              |
| `children`              | `ReactNode` or payload render function | -        | Root content or payload-driven render function.                       |

### `TooltipProvider`

| Prop         | Type     | Default | Notes                                                         |
| ------------ | -------- | ------- | ------------------------------------------------------------- |
| `delay`      | `number` | -       | Shared open delay for grouped tooltips.                       |
| `closeDelay` | `number` | -       | Shared close delay for grouped tooltips.                      |
| `timeout`    | `number` | `400`   | Time window where the next nearby tooltip can open instantly. |

### `TooltipTrigger`

`TooltipTrigger` exposes Base UI trigger behavior plus the moduix default trigger styling when
`render` is omitted.

| Prop           | Type                       | Default | Notes                                                                              |
| -------------- | -------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `render`       | element or render function | -       | Replaces the DOM element. No default trigger class is added in this mode.          |
| `handle`       | `TooltipHandle<Payload>`   | -       | Connects detached triggers.                                                        |
| `payload`      | `Payload`                  | -       | Payload passed to the active tooltip root.                                         |
| `delay`        | `number`                   | `600`   | Trigger-level open delay. Overrides the provider delay for this trigger.           |
| `closeOnClick` | `boolean`                  | `true`  | Closes the tooltip when the trigger is clicked.                                    |
| `closeDelay`   | `number`                   | `0`     | Trigger-level close delay.                                                         |
| `disabled`     | `boolean`                  | `false` | Prevents tooltip logic for this trigger, but does not add the DOM `disabled` prop. |
| `className`    | string or state callback   | -       | Applied to the rendered trigger element.                                           |

If the trigger is icon-only, add an accessible name such as `aria-label` that matches the tooltip
text. Tooltips are a visual hint, not the accessible label source.

### `TooltipContent`

`TooltipContent` applies popup props to `TooltipPopup` and positioning props to `TooltipPositioner`.

| Prop                 | Type                     | Default | Notes                                                |
| -------------------- | ------------------------ | ------- | ---------------------------------------------------- |
| `showArrow`          | `boolean`                | `false` | Adds the default `TooltipArrow` before the viewport. |
| `side`               | `Side`                   | -       | Floating side.                                       |
| `sideOffset`         | `number`                 | `8`     | Default spacing between trigger and tooltip.         |
| `align`              | `Align`                  | -       | Floating alignment.                                  |
| `alignOffset`        | `number`                 | -       | Alignment offset.                                    |
| `arrowPadding`       | `number`                 | -       | Arrow collision padding.                             |
| `collisionAvoidance` | `boolean`                | Base UI | Enables collision-aware repositioning.               |
| `collisionBoundary`  | boundary or boundaries   | -       | Collision boundary override.                         |
| `collisionPadding`   | padding                  | -       | Collision padding override.                          |
| `className`          | string or state callback | -       | Styles the visible popup surface (`TooltipPopup`).   |

`TooltipContent` does **not** accept portal-level props such as `keepMounted` or `container`. Switch
to explicit `TooltipPortal` composition when you need them.

### Other exported parts

- `TooltipPortal`, `TooltipPositioner`, `TooltipPopup`, `TooltipArrow`, and `TooltipViewport`
  forward the corresponding Base UI part props and add moduix classes plus `data-slot`.
- `TooltipArrow` renders the local `PopupArrowIcon` by default. Passing `children` replaces that SVG
  while keeping the wrapper and positioning behavior.
- `createTooltipHandle` is a direct re-export of `TooltipPrimitive.createHandle()`.

## Defaults and styling

Every DOM part accepts `className`. `Tooltip` and `TooltipProvider` do not render a DOM node.

### State and slot hooks used by moduix CSS

All exported DOM parts include the `data-slot` values listed above. The current CSS relies on these
state attributes:

| Part              | State attributes used by moduix CSS                        |
| ----------------- | ---------------------------------------------------------- |
| `TooltipTrigger`  | `data-popup-open`, `data-trigger-disabled`                 |
| `TooltipPopup`    | `data-starting-style`, `data-ending-style`, `data-instant` |
| `TooltipArrow`    | `data-side`                                                |
| `TooltipViewport` | `data-transitioning`, `data-current`, `data-previous`      |

Base UI emits additional attributes such as `data-open`, `data-closed`, `data-side`, `data-align`,
`data-anchor-hidden`, `data-activation-direction`, and `data-instant` on several parts. They are
available for custom styling even when moduix does not target them by default.

### Styling contract

- `TooltipContent className` styles the popup surface, not the positioner or viewport.
- `TooltipTrigger` gets the local trigger skin only on the default trigger path. When `render` is
  used, you own the rendered element styling.
- `TooltipPopup` keeps `overflow: visible` so the arrow can render outside the popup edge.
- `TooltipViewport` keeps `overflow: hidden`, so overhanging children will be clipped. If the
  content needs custom clipping or scroll behavior, use explicit composition and style the viewport
  or an inner wrapper yourself.
- `Tooltip` has no variants. `showArrow` is the only wrapper-level popup sugar.

### CSS variables

#### Trigger

| Variable                         | Default/fallback                  |
| -------------------------------- | --------------------------------- |
| `--tooltip-trigger-height`       | `var(--size-lg)`                  |
| `--tooltip-trigger-padding-y`    | `0.5rem`                          |
| `--tooltip-trigger-padding-x`    | `0.875rem`                        |
| `--tooltip-trigger-border-width` | `var(--border-width-sm)`          |
| `--tooltip-trigger-border-color` | `var(--color-border)`             |
| `--tooltip-trigger-radius`       | `var(--radius-md)`                |
| `--tooltip-trigger-bg`           | `var(--color-background)`         |
| `--tooltip-trigger-bg-hover`     | `var(--color-accent)`             |
| `--tooltip-trigger-bg-active`    | `var(--tooltip-trigger-bg-hover)` |
| `--tooltip-trigger-color`        | `var(--color-foreground)`         |
| `--tooltip-trigger-font-size`    | `var(--text-sm)`                  |
| `--tooltip-trigger-line-height`  | `var(--line-height-text-sm)`      |
| `--tooltip-focus-ring-width`     | `var(--border-width-sm)`          |
| `--tooltip-focus-ring-color`     | `var(--color-ring)`               |
| `--tooltip-focus-ring-offset`    | `-1px`                            |
| `--tooltip-disabled-opacity`     | `var(--opacity-disabled)`         |
| `--tooltip-transition`           | `var(--transition-default)`       |

#### Popup surface and arrow

| Variable                        | Default/fallback                                   |
| ------------------------------- | -------------------------------------------------- |
| `--tooltip-width`               | `max-content`                                      |
| `--tooltip-max-width`           | `20rem`                                            |
| `--tooltip-max-height`          | `24rem`                                            |
| `--tooltip-padding-y`           | `0.25rem`                                          |
| `--tooltip-padding-x`           | `0.5rem`                                           |
| `--tooltip-radius`              | `var(--radius-md)`                                 |
| `--tooltip-bg`                  | `var(--color-popover)`                             |
| `--tooltip-color`               | `var(--color-popover-foreground)`                  |
| `--tooltip-border-width`        | `var(--border-width-sm)`                           |
| `--tooltip-border-color`        | `var(--color-border)`                              |
| `--tooltip-shadow`              | `var(--shadow-lg)`                                 |
| `--tooltip-font-size`           | `var(--text-sm)`                                   |
| `--tooltip-line-height`         | `var(--line-height-text-sm)`                       |
| `--tooltip-arrow-size`          | `8px`                                              |
| `--tooltip-arrow-inline-offset` | `13px`                                             |
| `--tooltip-arrow-width`         | `1.25rem`                                          |
| `--tooltip-arrow-height`        | `0.625rem`                                         |
| `--tooltip-arrow-stroke-color`  | `var(--tooltip-border-color, var(--color-border))` |
| `--tooltip-content-transition`  | `150ms`                                            |

#### Positioning and transition vars from Base UI

These values are set by the floating/transition system and are useful for custom styling, but they
are not wrapper sugar props:

| Variable             | Meaning                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `--available-width`  | Free width between the trigger and viewport edge.                |
| `--available-height` | Free height between the trigger and viewport edge.               |
| `--anchor-width`     | Trigger width.                                                   |
| `--anchor-height`    | Trigger height.                                                  |
| `--transform-origin` | Anchor point used for popup transforms and animations.           |
| `--popup-width`      | Previous popup width snapshot used during viewport transitions.  |
| `--popup-height`     | Previous popup height snapshot used during viewport transitions. |

`--positioner-width` and `--positioner-height` are internal positioning variables used by Base UI.
Do not treat them as public theming hooks.

## UX and accessibility notes

- Tooltips are a visual enhancement for sighted hover/focus users. Do not rely on them as the only
  label or instruction for an action.
- Prefer short, plain text content. If the popup needs links, buttons, forms, or long-form
  explanation, use `Popover` or `PreviewCard` instead.
- Keep icon-only triggers accessible with `aria-label` or an equivalent accessible name that closely
  matches the tooltip text.
- `TooltipTrigger disabled` only disables tooltip behavior. If the rendered control itself should be
  disabled, pass `disabled` to the rendered element as well.
- `data-trigger-disabled` is the correct disabled styling hook for `TooltipTrigger`. Unlike most
  other popup triggers in the library, Base UI does **not** emit `data-disabled` here.
- Keyboard users open the tooltip by focusing the trigger. Do not remove focusability from the
  trigger unless the tooltip is intentionally unavailable.

## Intentional differences from Base UI

- This file documents the moduix wrapper contract, not the full Base UI primitive surface.
- The default trigger path is styled. Base UI is unstyled.
- `TooltipContent` is local DX sugar for the common path:
  `Portal -> Positioner -> Popup -> optional Arrow -> Viewport`.
- `showArrow` and `sideOffset={8}` are the only wrapper-level convenience defaults on
  `TooltipContent`.
- `TooltipArrow` uses the local `PopupArrowIcon` by default.
- All exported DOM parts include stable `data-slot` hooks for local styling.

## Agent notes

- Preserve the default `TooltipContent` structure, including the built-in `TooltipViewport`.
- Keep `showArrow` as the shared popup-family arrow prop name.
- Do not rename or normalize `data-trigger-disabled` to `data-disabled`; the current selector is
  intentional and matches Base UI.
- Keep `TooltipTrigger` styling conditional on the absence of `render`.

## Motion tokens

`TooltipPopup` now exposes phase-specific motion variables. Override the popup `starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to replace the default scale-in tooltip motion with fade, slide, or mixed entry/exit effects without changing the wrapper structure.

## Local changelog

- 2026-06-10: Added phase-specific popup motion tokens so tooltip entry and exit can be retuned to fade, slide, or mixed effects through CSS variables while preserving the shipped default.
- 2026-06-03: Replaced the copied Base UI page with moduix-specific Tooltip documentation and
  documented the actual wrapper contract, tooltip-only root props, styling hooks, and constraints.