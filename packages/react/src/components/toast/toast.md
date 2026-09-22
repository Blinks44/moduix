# Toast

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/toast

## Purpose

`Toast` is the moduix wrapper around Ark UI Toast for transient feedback, status changes, queued
notifications, and direct toast actions.

The wrapper keeps Ark's toaster store and render-prop composition intact while adding moduix
default styles, stable `data-slot` hooks, small leaf-level defaults for title and description, and
the library `CloseButton` as the default close trigger surface.

## Upstream model to preserve

- Uses `@ark-ui/react/toast` directly.
- Keeps Ark's store-first model: `createToaster(options)` creates the store, and `ToastToaster` renders
  that store with a render prop.
- Keeps Ark anatomy centered on `ToastToaster`, `Toast`, `ToastTitle`, `ToastDescription`,
  `ToastActionTrigger`, `ToastCloseTrigger`, and `ToastContext`.
- Keeps Ark store methods and option names unchanged, including `create`, `success`, `error`,
  `warning`, `info`, `loading`, `promise`, `update`, `dismiss`, `remove`, placement, overlap, gap,
  max, duration, remove delay, hotkey, offsets, and `onStatusChange(details)`.
- Keeps Ark runtime layout variables on `Toast`: `--x`, `--y`, `--scale`, `--z-index`,
  `--height`, `--opacity`, and `--gap`.

## Current behavior contract

`ToastToaster` portals itself to `document.body` by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. No explicit `Portal` wrapper is required.

- Public API is flat: `Toast` is the root, with `ToastContext`, `ToastTitle`, `ToastDescription`,
  `ToastActionTrigger`, `ToastCloseTrigger`, and `ToastToaster` as direct exports.
- `createToaster` and `useToastContext` are also exported as standalone names for ergonomic imports.
- `ToastToaster` renders the standard moduix toast when no render prop is passed: non-null title and
  description, an action when present, and `ToastCloseTrigger` unless `closable: false` is set.
- `createToaster()` follows Ark's default `type: 'info'`. The card-based `info`, `success`,
  `warning`, and `error` surfaces match `Alert`.
- `ToastTitle` renders `toast.title` from Ark context when `children` is omitted. Passing `null`
  intentionally renders no title content.
- `ToastDescription` renders `toast.description` from Ark context when `children` is omitted.
  Passing `null` intentionally renders no description content.
- `ToastCloseTrigger` renders `CloseButton` by default and defaults its accessible label to
  `"Close toast"` when `aria-label` is omitted.
- All Ark callback details and store methods pass through unchanged.

## Anatomy and exported parts

```text
createToaster()
└─ Overlay subtree (automatically portalled)
   └─ ToastToaster
      └─ Toast
         ├─ ToastTitle
         ├─ ToastDescription
         ├─ ToastActionTrigger
         └─ ToastCloseTrigger
```

Every visual exported part accepts `className` and receives a stable `data-slot`:

| Part                  | `data-slot`            | Notes                                                    |
| --------------------- | ---------------------- | -------------------------------------------------------- |
| `Toast`               | `toast-root`           | Styled Ark root.                                         |
| `ToastToaster`        | `toast-toaster`        | Styled Ark group renderer for a `createToaster()` store. |
| `ToastTitle`          | `toast-title`          | Defaults to the current toast title.                     |
| `ToastDescription`    | `toast-description`    | Defaults to the current toast description.               |
| `ToastActionTrigger`  | `toast-action-trigger` | Styled Ark action button for the current toast action.   |
| `ToastCloseTrigger`   | `toast-close-trigger`  | Defaults to `CloseButton` and the `"Close toast"` label. |

## Composition

```tsx
import { Button } from '@moduix/react/button';
import { ToastToaster, createToaster } from '@moduix/react/toast';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export function ToastExample() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.create({
            title: 'Scheduled for tomorrow',
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
            type: 'info',
          })
        }
      >
        Schedule meeting
      </Button>
      <ToastToaster toaster={toaster} />
    </>
  );
}
```

## Upstream feature coverage

- `Anatomy`: preserved through Ark-shaped parts and an optional `ToastToaster` render prop for advanced
  customization.
- `Setup`: preserved through `createToaster(options)`.
- `Basic`: supported through `toaster.create(options)`.
- `Types`: supports the default `info` type plus `success`, `error`, and `warning` store methods
  through `data-type`.
- `Promise Toast`: supported through `toaster.promise()`.
- `Update`: supported through `toaster.update(id, options)`.
- `Action`: supported through `toast.action` and `ToastActionTrigger`.
- `Duration`: supported through per-toast `duration` and store-level `duration`.
- `Max Visible`: supported through `createToaster({ max })`.
- `Placement`: supported through Ark placements `top-start`, `top`, `top-end`, `bottom-start`,
  `bottom`, and `bottom-end`.
- `Toast in Effects`: supported by deferring store calls with `queueMicrotask()`.
- `Styling`: preserves Ark runtime layout variables, type selectors, and mobile group/root sizing.
- Advanced toast state is available through `ToastContext` and `useToastContext()` from moduix.

## Accessibility and state

- Ark live-region behavior, grouping, pausing, focus hotkey, dismiss lifecycle, and status changes
  remain intact.
- The default Ark hotkey is `["altKey", "KeyT"]`; configure it through `createToaster({ hotkey })`.
- A custom accessible group label through the `label` group prop is typed on `ToastToaster` but is not
  forwarded to the group machine in `@ark-ui/react@5.39.2`; the live-region label stays
  `"Notifications, <placement> (<hotkey>)"` until upstream chakra-ui/ark#4045 ships in a release.
- `ToastCloseTrigger` remains a button and receives a default accessible label. If `asChild` is
  used, the custom child must keep an accessible name and button semantics.
- `ToastActionTrigger` remains a button wired to `toast.action.onClick`. If `asChild` is used, the
  custom child must keep button semantics.
- Ark state/data attributes remain available:
  - `data-scope="toast"` and `data-part` on Ark parts
  - `data-state="open" | "closed"` on `Toast`
  - `data-type`, `data-placement`, `data-align`, `data-side`, `data-mounted`, `data-paused`,
    `data-first`, `data-sibling`, `data-stack`, and `data-overlap` on `Toast`
- Ark runtime variables remain available on the root and group, including `--x`, `--y`, `--scale`,
  `--z-index`, `--height`, `--opacity`, `--gap`, `--first-height`, and viewport offset variables.

## Defaults and styling

Primary CSS variables:

| Variable                                | Default                                                               |
| --------------------------------------- | --------------------------------------------------------------------- |
| `--moduix-toast-width`                  | `20rem`                                                               |
| `--moduix-toast-viewport-inset`         | `var(--moduix-spacing-4)`                                             |
| `--moduix-toast-bg`                     | `var(--moduix-toast-info-bg, var(--moduix-color-card))`               |
| `--moduix-toast-color`                  | `var(--moduix-toast-info-color, var(--moduix-color-card-foreground))` |
| `--moduix-toast-border-color`           | `var(--moduix-toast-info-border-color, var(--moduix-color-border))`   |
| `--moduix-toast-border-width`           | `var(--moduix-border-width-sm)`                                       |
| `--moduix-toast-radius`                 | `var(--moduix-radius-lg)`                                             |
| `--moduix-toast-shadow`                 | `var(--moduix-shadow-lg)`                                             |
| `--moduix-toast-padding`                | `var(--moduix-spacing-4)`                                             |
| `--moduix-toast-content-gap`            | `var(--moduix-spacing-1)`                                             |
| `--moduix-toast-title-font-size`        | `var(--moduix-text-sm)`                                               |
| `--moduix-toast-title-font-weight`      | `var(--moduix-weight-semibold)`                                       |
| `--moduix-toast-description-color`      | `var(--moduix-color-muted-foreground)`                                |
| `--moduix-toast-action-bg-hover`        | `var(--moduix-color-accent)`                                          |
| `--moduix-toast-action-gap`             | `var(--moduix-spacing-2)`                                             |
| `--moduix-toast-action-min-height`      | `var(--moduix-size-xs)`                                               |
| `--moduix-toast-close-bg-hover`         | `var(--moduix-color-muted)`                                           |
| `--moduix-toast-close-focus-ring-width` | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))`       |
| `--moduix-toast-close-size`             | `var(--moduix-spacing-7)`                                             |
| `--moduix-toast-close-icon-size`        | `var(--moduix-spacing-3)`                                             |
| `--moduix-toast-transition`             | `350ms`                                                               |
| `--moduix-toast-transition-out`         | `350ms`                                                               |
| `--moduix-toast-opacity-transition-out` | `200ms`                                                               |

Each visual status has its own surface overrides, so consumers can theme an individual status
without selectors or affecting other toast types:

| Type             | Background variable         | Border variable                       | Color variable                 |
| ---------------- | --------------------------- | ------------------------------------- | ------------------------------ |
| default / `info` | `--moduix-toast-info-bg`    | `--moduix-toast-info-border-color`    | `--moduix-toast-info-color`    |
| `success`        | `--moduix-toast-success-bg` | `--moduix-toast-success-border-color` | `--moduix-toast-success-color` |
| `warning`        | `--moduix-toast-warning-bg` | `--moduix-toast-warning-border-color` | `--moduix-toast-warning-color` |
| `error`          | `--moduix-toast-error-bg`   | `--moduix-toast-error-border-color`   | `--moduix-toast-error-color`   |

The CSS keeps Ark `data-scope` and `data-part` attributes intact, styles state through root
`data-state` and `data-type`, and consumes Ark runtime variables. Moduix `data-slot` hooks are
layered on top for stable consumer selectors. On viewports up to `40rem`, the group spans the
viewport and roots use Ark's `--gap` variable for safe inline spacing.

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `ToastTitle` and `ToastDescription` can render the current toast context values without
  repeating children in every render prop.
- `ToastCloseTrigger` uses the moduix `CloseButton` by default and keeps the default
  accessible label. Its default sizing, hover, icon, focus ring, and transition values match
  `CloseButton`; toast-specific `--moduix-toast-close-*` variables only override that shared baseline.
- Omitting `ToastToaster` children opts into the standard moduix renderer. Pass the Ark render prop to
  customize the layout, individual parts, or close icon.
- `ToastToaster` owns portal transport directly and keeps toast anatomy independent from mounting.
- moduix re-exports `useToastContext` for custom child parts. Import Ark type aliases directly
  when app-level typing needs them.
- legacy compatibility exports and anchored toast helpers were removed as a breaking migration.

## Agent notes

- Ark's `createToaster` store is the public state model.
- Keep `Toast` as the outer node inside `ToastToaster` render props; Ark relies on it for layout,
  measurement, and dismiss lifecycle.
- Preserve Ark placement values. Do not map them back to legacy `bottom-right` style names.
- Preserve Ark `action` instead of legacy `actionProps`.
- Preserve Ark runtime CSS variables and the required translate/scale/opacity/height styles on
  `Toast`.

## Local changelog

- 2026-08-14: Aligned card-based info, success, warning, and error surfaces with Alert; protected
  long toast content from overflow; and covered action dismissal plus inline rendering.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-31: Documented the `useToastContext` re-export and restored native text selection inside
  toast content.
- 2026-07-12: Added the default `ToastToaster` renderer for the standard title, description, action,
  and close-control layout; custom render props remain the advanced path.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-29: Re-exported Ark toaster creation/prop types directly, allowed explicit `null`
  title/description content, simplified placement-independent shadows, aligned action sizing with
  library tokens, and added Ark-style mobile sizing.
- 2026-06-21: Migrated Toast to Ark UI, replacing provider/region/manager APIs with
  `createToaster`, `ToastToaster`, and Ark-shaped parts. Removed anchored toast helpers and legacy
  compatibility exports.
- 2026-06-21: Updated styling to Ark `data-scope`, `data-part`, `data-state`, `data-type`, and
  runtime variables (`--x`, `--y`, `--scale`, `--z-index`, `--height`, `--opacity`).
- 2026-06-21: Restored white default/info toast styling, aligned transitions with Ark's root
  guidance, and fixed placement examples by keeping all placement stores mounted.
- 2026-06-21: Aligned default `ToastCloseTrigger` styling with `CloseButton` while preserving
  toast-scoped close override variables.
