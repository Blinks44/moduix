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

`Toaster` portals itself to `document.body` by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. No explicit `Portal` wrapper is required.

- Public API is namespace-first: `Toast` is the short root form and also exposes `Toast.Root`,
  `Toast.Title`, `Toast.Description`, `Toast.ActionTrigger`, `Toast.CloseTrigger`, and
  `Toast.Toaster`.
- `Toaster` and `createToaster` are also exported as standalone names for ergonomic imports.
- `Toaster` renders the standard moduix toast when no render prop is passed: non-null title and
  description, an action when present, and `CloseTrigger` unless `closable: false` is set.
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
└─ Overlay subtree (automatically portalled)
   └─ Toast.Toaster / Toaster
      └─ Toast.Root / Toast
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

## Composition

```tsx
import { Button, Toast, Toaster, createToaster } from '@moduix/react';

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
      <Toaster toaster={toaster} />
    </>
  );
}
```

## Upstream feature coverage

- `Anatomy`: preserved through Ark-shaped parts and an optional `Toaster` render prop for advanced
  customization.
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
- Advanced toast state is available through `Toast.Context` and `useToastContext()` from moduix.

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

| Variable                                | Default                                                         |
| --------------------------------------- | --------------------------------------------------------------- |
| `--moduix-toast-width`                  | `20rem`                                                         |
| `--moduix-toast-viewport-inset`         | `var(--moduix-spacing-4)`                                       |
| `--moduix-toast-bg`                     | `var(--moduix-color-popover)`                                   |
| `--moduix-toast-color`                  | `var(--moduix-color-popover-foreground)`                        |
| `--moduix-toast-border-color`           | `var(--moduix-color-border)`                                    |
| `--moduix-toast-border-width`           | `var(--moduix-border-width-sm)`                                 |
| `--moduix-toast-radius`                 | `var(--moduix-radius-lg)`                                       |
| `--moduix-toast-shadow`                 | `var(--moduix-shadow-lg)`                                       |
| `--moduix-toast-padding`                | `var(--moduix-spacing-4)`                                       |
| `--moduix-toast-content-gap`            | `var(--moduix-spacing-1)`                                       |
| `--moduix-toast-title-font-size`        | `var(--moduix-text-sm)`                                         |
| `--moduix-toast-title-font-weight`      | `var(--moduix-weight-semibold)`                                 |
| `--moduix-toast-description-color`      | `var(--moduix-color-muted-foreground)`                          |
| `--moduix-toast-action-bg-hover`        | `var(--moduix-color-accent)`                                    |
| `--moduix-toast-action-gap`             | `var(--moduix-spacing-2)`                                       |
| `--moduix-toast-action-min-height`      | `var(--moduix-size-xs)`                                         |
| `--moduix-toast-close-bg-hover`         | `var(--moduix-color-muted)`                                     |
| `--moduix-toast-close-focus-ring-width` | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))` |
| `--moduix-toast-close-size`             | `var(--moduix-spacing-7)`                                       |
| `--moduix-toast-close-icon-size`        | `var(--moduix-spacing-3)`                                       |
| `--moduix-toast-transition`             | `400ms`                                                         |
| `--moduix-toast-transition-out`         | `400ms`                                                         |
| `--moduix-toast-opacity-transition-out` | `200ms`                                                         |
| `--moduix-toast-z-index`                | `var(--moduix-z-toast)`                                         |

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
  `CloseButton`; toast-specific `--moduix-toast-close-*` variables only override that shared baseline.
- `Toast.Toaster` is attached to the `Toast` namespace even though Ark exports `Toaster` as a
  standalone component.
- Omitting `Toaster` children opts into the standard moduix renderer. Pass the Ark render prop to
  customize the layout, individual parts, or close icon.
- `Toaster` owns portal transport directly and keeps toast anatomy independent from mounting.
- moduix does not re-export Ark toast context helpers or toast type aliases; import those directly
  from Ark when a custom child part or app-level typing needs them.
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

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-03: Removed public re-exports of Ark toast context helpers and type aliases so moduix
  keeps the toaster wiring and visual parts public without mirroring Ark's advanced state API.
- 2026-07-12: Added the default `Toaster` renderer for the standard title, description, action,
  and close-control layout; custom render props remain the advanced path.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

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
- 2026-06-21: Aligned default `Toast.CloseTrigger` styling with `CloseButton.Root` while preserving
  toast-scoped close override variables.