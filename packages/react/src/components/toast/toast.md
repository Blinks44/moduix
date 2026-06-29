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
- Keeps Ark's store-first model: `createToaster(options)` creates the store, and `Toaster` renders
  that store with a render prop.
- Keeps Ark anatomy centered on `Toaster`, `Root`, `Title`, `Description`, `ActionTrigger`,
  `CloseTrigger`, and `Context`.
- Keeps Ark store methods and option names unchanged, including `create`, `success`, `error`,
  `warning`, `info`, `loading`, `promise`, `update`, `dismiss`, `remove`, placement, overlap, gap,
  max, duration, remove delay, hotkey, offsets, and `onStatusChange(details)`.
- Keeps Ark runtime layout variables on `Toast.Root`: `--x`, `--y`, `--scale`, `--z-index`,
  `--height`, `--opacity`, and `--gap`.

## Current behavior contract

- Public API is namespace-first: `Toast` is the short root form and also exposes `Toast.Root`,
  `Toast.Title`, `Toast.Description`, `Toast.ActionTrigger`, `Toast.CloseTrigger`, `Toast.Context`,
  and `Toast.Toaster`.
- `Toaster`, `createToaster`, and `useToastContext` are also exported as standalone names for
  ergonomic imports.
- Ark's `CreateToasterProps`, `CreateToasterReturn`, `ToasterProps`, toast option, placement,
  status, action, promise, and context types are re-exported without local copies.
- `Toast.Title` renders `toast.title` from Ark context when `children` is omitted. Passing `null`
  intentionally renders no title content.
- `Toast.Description` renders `toast.description` from Ark context when `children` is omitted.
  Passing `null` intentionally renders no description content.
- `Toast.CloseTrigger` renders `CloseButton.Root` by default and defaults its accessible label to
  `"Close toast"` when `aria-label` is omitted.
- All Ark callback details and store method signatures pass through unchanged.

## Anatomy and exported parts

```text
createToaster()
└─ Portal
   └─ Toast.Toaster / Toaster
      └─ Toast.Root / Toast
         ├─ Toast.Context (optional)
         ├─ Toast.Title
         ├─ Toast.Description
         ├─ Toast.ActionTrigger
         └─ Toast.CloseTrigger
```

Every visual exported part accepts `className` and receives a stable `data-slot`:

| Part                        | `data-slot`            | Notes                                                         |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| `Toast` / `Toast.Root`      | `toast-root`           | Styled Ark root and short consumer form.                      |
| `Toaster` / `Toast.Toaster` | `toast-toaster`        | Styled Ark group renderer for a `createToaster()` store.      |
| `Toast.Title`               | `toast-title`          | Defaults to the current toast title.                          |
| `Toast.Description`         | `toast-description`    | Defaults to the current toast description.                    |
| `Toast.ActionTrigger`       | `toast-action-trigger` | Styled Ark action button for the current toast action.        |
| `Toast.CloseTrigger`        | `toast-close-trigger`  | Defaults to `CloseButton.Root` and the `"Close toast"` label. |
| `Toast.Context`             | none                   | Ark render-prop state access.                                 |
| `Portal`                    | none                   | General moduix Portal, imported separately from Toast.        |

## Composition

```tsx
import { Button, Portal, Toast, Toaster, createToaster } from '@moduix/react';

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
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast key={toast.id}>
              <Toast.Title />
              <Toast.Description />
              {toast.action ? (
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
              ) : null}
              {toast.closable !== false ? <Toast.CloseTrigger /> : null}
            </Toast>
          )}
        </Toaster>
      </Portal>
    </>
  );
}
```

## Upstream feature coverage

- `Anatomy`: preserved through Ark-shaped parts and the required `Toaster` render prop.
- `Setup`: preserved through `createToaster(options)`.
- `Basic`: supported through `toaster.create(options)`.
- `Types`: supported through `success`, `error`, `warning`, and `info` store methods plus
  `data-type`.
- `Promise Toast`: supported through `toaster.promise()`.
- `Update`: supported through `toaster.update(id, options)`.
- `Action`: supported through `toast.action` and `Toast.ActionTrigger`.
- `Duration`: supported through per-toast `duration` and store-level `duration`.
- `Max Visible`: supported through `createToaster({ max })`.
- `Placement`: supported through Ark placements `top-start`, `top`, `top-end`, `bottom-start`,
  `bottom`, and `bottom-end`.
- `Toast in Effects`: supported by deferring store calls with `queueMicrotask()`.
- `Styling`: preserves Ark runtime layout variables, type selectors, and mobile group/root sizing.
- `Context`: exposed through `Toast.Context` and `useToastContext()`.

## Accessibility and state

- Ark live-region behavior, grouping, pausing, focus hotkey, dismiss lifecycle, and status changes
  remain intact.
- The default Ark hotkey is `["altKey", "KeyT"]`; configure it through `createToaster({ hotkey })`.
- Use the `label` group prop on `Toaster` when the toast group needs a custom accessible label.
- `Toast.CloseTrigger` remains a button and receives a default accessible label. If `asChild` is
  used, the custom child must keep an accessible name and button semantics.
- `Toast.ActionTrigger` remains a button wired to `toast.action.onClick`. If `asChild` is used, the
  custom child must keep button semantics.
- Ark state/data attributes remain available:
  - `data-scope="toast"` and `data-part` on Ark parts
  - `data-state="open" | "closed"` on `Toast.Root`
  - `data-type`, `data-placement`, `data-align`, `data-side`, `data-mounted`, `data-paused`,
    `data-first`, `data-sibling`, `data-stack`, and `data-overlap` on `Toast.Root`
- Ark runtime variables remain available on the root and group, including `--x`, `--y`, `--scale`,
  `--z-index`, `--height`, `--opacity`, `--gap`, `--first-height`, and viewport offset variables.

## Defaults and styling

Primary CSS variables:

| Variable                         | Default                           |
| -------------------------------- | --------------------------------- |
| `--toast-width`                  | `20rem`                           |
| `--toast-viewport-inset`         | `1rem`                            |
| `--toast-bg`                     | `var(--color-popover)`            |
| `--toast-color`                  | `var(--color-popover-foreground)` |
| `--toast-border-color`           | `var(--color-border)`             |
| `--toast-border-width`           | `var(--border-width-sm)`          |
| `--toast-radius`                 | `var(--radius-lg)`                |
| `--toast-shadow`                 | `var(--shadow-lg)`                |
| `--toast-padding`                | `1rem`                            |
| `--toast-content-gap`            | `0.25rem`                         |
| `--toast-title-font-size`        | `var(--text-sm)`                  |
| `--toast-title-font-weight`      | `var(--weight-semibold)`          |
| `--toast-description-color`      | `var(--color-muted-foreground)`   |
| `--toast-action-bg-hover`        | `var(--color-accent)`             |
| `--toast-action-gap`             | `var(--spacing-2)`                |
| `--toast-action-min-height`      | `var(--size-xs)`                  |
| `--toast-close-bg-hover`         | `var(--color-muted)`              |
| `--toast-close-focus-ring-width` | `var(--border-width-md)`          |
| `--toast-close-size`             | `28px`                            |
| `--toast-close-icon-size`        | `12px`                            |
| `--toast-transition`             | `400ms`                           |
| `--toast-transition-out`         | `400ms`                           |
| `--toast-opacity-transition-out` | `200ms`                           |
| `--toast-z-index`                | `var(--z-toast)`                  |

The CSS keeps Ark `data-scope` and `data-part` attributes intact, styles state through root
`data-state` and `data-type`, and consumes Ark runtime variables. Moduix `data-slot` hooks are
layered on top for stable consumer selectors. On viewports up to `40rem`, the group spans the
viewport and roots use Ark's `--gap` variable for safe inline spacing.

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `Toast.Title` and `Toast.Description` can render the current toast context values without
  repeating children in every render prop.
- `Toast.CloseTrigger` uses the moduix `CloseButton.Root` by default and keeps the default
  accessible label. Its default sizing, hover, icon, focus ring, and transition values match
  `CloseButton`; toast-specific `--toast-close-*` variables only override that shared baseline.
- `Toast.Toaster` is attached to the `Toast` namespace even though Ark exports `Toaster` as a
  standalone component.
- `Portal` is intentionally imported separately. Toast does not expose a `ToastPortal` alias or
  `Toast.Portal` namespace member because portal behavior is shared across components.
- legacy compatibility exports and anchored toast helpers were removed as a breaking migration.

## Agent notes

- Ark's `createToaster` store is the public state model.
- Keep `Toast.Root` as the outer node inside `Toaster` render props; Ark relies on it for layout,
  measurement, and dismiss lifecycle.
- Preserve Ark placement values. Do not map them back to legacy `bottom-right` style names.
- Preserve Ark `action` instead of legacy `actionProps`.
- Preserve Ark runtime CSS variables and the required translate/scale/opacity/height styles on
  `Toast.Root`.

## Local changelog

- 2026-06-29: Re-exported Ark toaster creation/prop types directly, allowed explicit `null`
  title/description content, simplified placement-independent shadows, aligned action sizing with
  library tokens, and added Ark-style mobile sizing.
- 2026-06-21: Migrated Toast to Ark UI, replacing provider/region/manager APIs with
  `createToaster`, `Toaster`, and Ark namespace parts. Removed anchored toast helpers and legacy
  compatibility exports.
- 2026-06-21: Updated styling to Ark `data-scope`, `data-part`, `data-state`, `data-type`, and
  runtime variables (`--x`, `--y`, `--scale`, `--z-index`, `--height`, `--opacity`).
- 2026-06-21: Restored white default/info toast styling, aligned transitions with Ark's root
  guidance, and fixed placement examples by keeping all placement stores mounted.
- 2026-06-21: Removed the `ToastPortal` / `Toast.Portal` alias. Use the shared `Portal` export
  separately around `Toaster`.
- 2026-06-21: Aligned default `Toast.CloseTrigger` styling with `CloseButton.Root` while preserving
  toast-scoped close override variables.