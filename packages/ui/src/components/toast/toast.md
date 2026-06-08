# Toast

Upstream primitive docs: https://base-ui.com/react/components/toast

## Purpose

`Toast` is a moduix wrapper around Base UI `Toast` with two opinionated notification flows:

- **stacked toasts** for page-level transient notifications (`ToastRegion`)
- **anchored toasts** for short feedback next to the control that triggered it (`ToastAnchoredRegion`)

The recommended API is provider + region composition. Low-level parts stay exported for custom
markup, but the wrapper contract is centered on `ToastProvider`, `ToastRegion`,
`ToastAnchoredRegion`, `useToastManager()`, and `useAnchoredToastManager()`.

## Current behavior contract

- `ToastProvider` creates two managers by default:
  - the normal stacked manager used by `useToastManager()`
  - a separate anchored manager used by `useAnchoredToastManager()`
- `ToastRegion` renders only non-anchored toasts from the stacked manager.
- `ToastAnchoredRegion` renders only anchored toasts from the anchored manager.
- `useAnchoredToastManager().show()` requires an `anchor` element and reuses one toast per anchor.
- Anchored toasts default `positionerProps.sideOffset` to `8`.
- Base UI `toast.type` passes through unchanged and is exposed as `data-type` on `ToastRoot`.
- moduix styles `info`, `success`, `warning`, and `destructive` out of the box so `Toast` stays in
  sync with `Alert`.
- Other `type` strings remain valid and can be styled through `[data-type]` plus `--toast-*`
  overrides.
- Default stacked markup is:

  ```text
  ToastRoot
  └─ ToastContent
     ├─ ToastTitle
     ├─ ToastDescription
     ├─ ToastAction (only when toast.actionProps exists)
     └─ ToastClose
  ```

- Default anchored markup is:

  ```text
  ToastRoot
  ├─ ToastArrow
  └─ ToastContent
     └─ ToastDescription
  ```

- The default anchored renderer intentionally **does not** show `toast.title` or
  `toast.actionProps`. Use `renderToast` for richer anchored composition.
- `ToastRegion` already includes `ToastPortal` + `ToastViewport`.
- `ToastAnchoredRegion` already includes `ToastPortal` + anchored viewport + `ToastPositioner`.
- `ToastClose` renders a default `CloseIcon` when no children are passed.
- `ToastArrow` renders the default popup arrow SVG when no children are passed.

## Composition

Recommended root setup:

```tsx
import { ToastAnchoredRegion, ToastProvider, ToastRegion } from 'moduix';

export function App() {
  return (
    <ToastProvider>
      <AppShell />
      <ToastRegion />
      <ToastAnchoredRegion />
    </ToastProvider>
  );
}
```

Typical stacked toast trigger:

```tsx
import { Button, ToastProvider, ToastRegion, useToastManager } from 'moduix';

export function SaveToast() {
  return (
    <ToastProvider>
      <SaveButton />
      <ToastRegion />
    </ToastProvider>
  );
}

function SaveButton() {
  const toastManager = useToastManager();

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Saved',
          description: 'Changes were saved successfully.',
        })
      }
    >
      Save changes
    </Button>
  );
}
```

Typical anchored toast trigger:

```tsx
import { Button, ToastAnchoredRegion, ToastProvider, useAnchoredToastManager } from 'moduix';
import { useRef } from 'react';

export function CopyToast() {
  return (
    <ToastProvider>
      <CopyButton />
      <ToastAnchoredRegion />
    </ToastProvider>
  );
}

function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const anchoredToast = useAnchoredToastManager();

  return (
    <Button
      ref={buttonRef}
      onClick={() => {
        if (!buttonRef.current) {
          return;
        }

        anchoredToast.show({
          anchor: buttonRef.current,
          description: 'Copied',
          timeout: 1800,
        });
      }}
    >
      Copy
    </Button>
  );
}
```

### Parts

| Part                  | Slot / data-slot                                    | Purpose                                                         |
| --------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| `ToastProvider`       | -                                                   | Provides the stacked manager and the anchored helper manager.   |
| `ToastRegion`         | wraps `toast-portal` + `toast-viewport`             | Default stacked region with built-in portal + viewport.         |
| `ToastAnchoredRegion` | wraps `toast-portal` + `toast-anchored-viewport`    | Default anchored region with built-in portal + positioner flow. |
| `ToastPortal`         | `toast-portal`                                      | Portal root.                                                    |
| `ToastViewport`       | `toast-viewport`                                    | Stacked viewport.                                               |
| `ToastPositioner`     | `toast-positioner`                                  | Anchored toast positioner.                                      |
| `ToastRoot`           | `toast-root` or `toast-anchored-root`               | Visible toast surface.                                          |
| `ToastContent`        | `toast-content` or `toast-anchored-content`         | Visible body layout wrapper.                                    |
| `ToastTitle`          | `toast-title`                                       | Renders `toast.title`.                                          |
| `ToastDescription`    | `toast-description` or `toast-anchored-description` | Renders `toast.description`.                                    |
| `ToastAction`         | `toast-action`                                      | Renders `toast.actionProps`.                                    |
| `ToastClose`          | `toast-close`                                       | Dismiss button.                                                 |
| `ToastArrow`          | `toast-anchored-arrow`                              | Default anchored arrow.                                         |

### Public wrapper props

The low-level parts forward the matching Base UI primitive props. The wrapper adds these moduix
props and conventions:

#### `ToastProvider`

Extends `ToastPrimitive.Provider.Props`.

| Prop                   | Type               | Default          | Purpose                              |
| ---------------------- | ------------------ | ---------------- | ------------------------------------ |
| `toastManager`         | `BaseToastManager` | internal manager | Replaces the stacked toast manager.  |
| `anchoredToastManager` | `BaseToastManager` | internal manager | Replaces the anchored toast manager. |

#### `ToastRegion`

Extends `ToastPrimitive.Viewport.Props` except `children`.

| Prop            | Type                                       | Default                |
| --------------- | ------------------------------------------ | ---------------------- |
| `placement`     | `ToastPlacement`                           | `'bottom-right'`       |
| `stackBehavior` | `ToastStackBehavior`                       | `'stacked'`            |
| `container`     | `ToastPrimitive.Portal.Props['container']` | `document.body`        |
| `renderToast`   | `(toast, index) => ReactNode`              | default stacked markup |

#### `ToastAnchoredRegion`

Extends `ToastPrimitive.Viewport.Props` except `children`.

| Prop          | Type                                       | Default                 |
| ------------- | ------------------------------------------ | ----------------------- |
| `container`   | `ToastPrimitive.Portal.Props['container']` | `document.body`         |
| `renderToast` | `(toast, index) => ReactNode`              | default anchored markup |

#### `ToastViewport`

Extends `ToastPrimitive.Viewport.Props`.

| Prop            | Type                 | Default          |
| --------------- | -------------------- | ---------------- |
| `placement`     | `ToastPlacement`     | `'bottom-right'` |
| `stackBehavior` | `ToastStackBehavior` | `'stacked'`      |

#### `ToastRoot`

Extends `ToastPrimitive.Root.Props`.

| Prop        | Type             | Default                        | Purpose                                                                         |
| ----------- | ---------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `placement` | `ToastPlacement` | inherited from `ToastViewport` | Overrides the swipe-direction + placement data attribute for one stacked toast. |

### Exported helper types

- `ToastPlacement`
- `ToastStackBehavior`
- `AnchoredToastOptions`

Use them instead of deriving literal unions from component props.

## Defaults and styling

### `className`

These parts accept `className` and merge it with moduix defaults:

- `ToastPortal`
- `ToastViewport`
- `ToastRoot`
- `ToastContent`
- `ToastTitle`
- `ToastDescription`
- `ToastAction`
- `ToastClose`
- `ToastPositioner`
- `ToastArrow`
- `ToastRegion` / `ToastAnchoredRegion` (applied to the internal viewport)

### Data attributes

Moduix-specific hooks:

- `data-slot` on every exported visual part listed above
- `data-placement` on `ToastViewport` and `ToastRoot`
- `data-stack-behavior` on `ToastViewport`, `ToastRoot`, and stacked `ToastContent`

Base UI state hooks that moduix styles rely on:

- stacked root: `data-expanded`, `data-starting-style`, `data-ending-style`, `data-limited`,
  `data-swipe-direction`
- stacked content: `data-behind`, `data-expanded`
- anchored arrow: `data-side`

Variant hook:

- `data-type` on `ToastRoot`, mirroring Base UI `toast.type`

### CSS variables

Public `--toast-*` overrides used by this wrapper:

#### Shared surface and layout

- `--toast-bg`
- `--toast-border-color`
- `--toast-border-width`
- `--toast-color`
- `--toast-padding`
- `--toast-radius`
- `--toast-shadow`
- `--toast-z-index`

#### Viewport and stacked motion

- `--toast-stack-gap`
- `--toast-stack-peek`
- `--toast-transition`
- `--toast-viewport-inset`
- `--toast-viewport-width`

#### Title, description, and content

- `--toast-content-gap`
- `--toast-description-color`
- `--toast-description-font-size`
- `--toast-description-line-height`
- `--toast-title-font-size`
- `--toast-title-font-weight`
- `--toast-title-line-height`

#### Action button

- `--toast-action-bg`
- `--toast-action-bg-hover`
- `--toast-action-border-color`
- `--toast-action-border-width`
- `--toast-action-color`
- `--toast-action-font-size`
- `--toast-action-font-weight`
- `--toast-action-line-height`
- `--toast-action-margin-top`
- `--toast-action-padding-x`
- `--toast-action-padding-y`
- `--toast-action-radius`

#### Close button and focus ring

- `--toast-close-bg`
- `--toast-close-bg-hover`
- `--toast-close-color`
- `--toast-close-color-hover`
- `--toast-close-focus-ring-offset`
- `--toast-close-icon-size`
- `--toast-close-offset-right`
- `--toast-close-offset-top`
- `--toast-close-padding`
- `--toast-close-radius`
- `--toast-close-size`
- `--toast-focus-ring-color`
- `--toast-focus-ring-offset`
- `--toast-focus-ring-width`

#### Anchored-only

- `--toast-anchored-arrow-height`
- `--toast-anchored-arrow-offset-x`
- `--toast-anchored-arrow-offset-y`
- `--toast-anchored-arrow-width`
- `--toast-anchored-font-size`
- `--toast-anchored-line-height`
- `--toast-anchored-max-width`
- `--toast-anchored-padding-x`
- `--toast-anchored-padding-y`
- `--toast-anchored-scale`
- `--toast-anchored-transition`

Base UI runtime variables like `--toast-index`, `--toast-height`, `--toast-offset-y`,
`--toast-swipe-movement-x`, `--toast-swipe-movement-y`, and `--toast-frontmost-height` are also
used internally by the CSS. Treat them as runtime inputs, not part of the moduix styling API.

## UX and accessibility

- Live-region behavior, swipe dismissal, timing, and keyboard interaction come from Base UI.
- Default stacked toasts include a close button with `aria-label="Close toast"`.
- If you replace the default close content, keep an accessible name on `ToastClose`.
- Use `toast.type="info" | "success" | "warning" | "destructive"` for the built-in moduix
  variants.
- Use selectors such as `[data-slot='toast-root'][data-type='syncing']` plus `--toast-*` overrides
  when one region needs app-specific variants; do not mount separate regions just for styling.
- Anchored toasts are best for brief confirmations such as copy/save/share feedback.
- The default anchored renderer has no close button or action button; keep timeouts short unless a
  custom `renderToast` adds explicit controls.
- Action buttons inherit disabled styling from the primitive props/state.
- Focus-visible styles exist for anchored roots, action buttons, and close buttons.

## Intentional differences from Base UI

- moduix exposes two explicit region components instead of teaching raw viewport composition first.
- anchored toasts use a separate manager and region so they do not mix into the stacked viewport.
- moduix adds `placement` and `stackBehavior` sugar to `ToastViewport` and `ToastRegion`.
- moduix adds normalized `data-slot` hooks to all exported parts.
- moduix adds built-in `Alert`-aligned styles for `toast.type="info" | "success" | "warning" |
"destructive"`.
- moduix mirrors Base UI `toast.type` to a `data-type` hook on `ToastRoot` for CSS-driven custom
  variants without extra regions.
- default anchored toasts are intentionally description-only, with a built-in arrow.
- `ToastClose` and `ToastArrow` provide default visuals out of the box.

## Limitations and recommendations

- Mount only the region(s) the app actually uses.
- Use `ToastRegion` for the common path; drop to `ToastPortal` + `ToastViewport` only when the
  viewport structure itself must be owned manually.
- Use `renderToast` when the region wiring is correct but the visible markup needs to change.
- Keep `ToastRoot` as the outer rendered item inside `renderToast`; the primitive relies on it for
  lifecycle and gesture behavior.
- Do not assume anchored toasts will show `title` or `actionProps` unless custom composition renders
  them.
- `closeByAnchor()` only works with the same live anchor element instance that was passed to
  `show()`.

## Agent notes

- Preserve the split between stacked and anchored managers. Do not merge them as “cleanup”.
- Preserve the default anchored description-only contract unless the requested behavior changes.
- Preserve the existing `data-slot` names; docs, stories, tests, and consumer selectors can rely on
  them.
- Preserve the built-in `Alert`-aligned toast variants and the `data-type` passthrough from Base UI
  `toast.type`; together they provide the simple path and the custom escape hatch.
- Preserve the public `--toast-*` variable names in `theme.css` and `Toast.module.css`.
- Keep `ToastObject<any>` internal typing unless Base UI changes its generic constraint; `unknown`
  is not a drop-in replacement there.

## Local changelog

- 2026-06: Rewrote the local docs around the actual moduix wrapper, documented the split stacked vs
  anchored contract, and recorded the public styling hooks and exported helper types.
- 2026-06: Added built-in `Alert`-aligned toast variants for `info`, `success`, `warning`, and
  `destructive`, while keeping `toast.type` on `ToastRoot[data-type]` for app-specific styling.