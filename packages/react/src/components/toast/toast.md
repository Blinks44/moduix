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
  A `loading` toast gets a decorative `Spinner` (`size="sm"`) before its title.
- The root reserves inline-end padding for the absolutely positioned close trigger only while a
  `ToastCloseTrigger` is rendered inside it (`:has([data-slot='toast-close-trigger'])`).
- `createToaster()` follows Ark's default `type: 'info'`. The card-based `info`, `success`,
  `warning`, and `error` surfaces match `Alert`.
- `ToastTitle` renders `toast.title` from Ark context when `children` is omitted. Passing `null`
  intentionally renders no title content.
- `ToastDescription` renders `toast.description` from Ark context when `children` is omitted.
  Passing `null` intentionally renders no description content.
- `ToastCloseTrigger` renders `CloseButton` by default and defaults its accessible label to
  `"Close toast"` when `aria-label` is omitted.
- Every package exports the Ark part prop types (`ToastRootProps`, `ToastTitleProps`, …),
  `ToasterProps` (with `portalled` and `portalRef`), `ToastOptions`, `ToastType`,
  `ToastPlacement`, `CreateToasterProps`, `CreateToasterReturn`, and `UseToastContext`.
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

| Part                 | `data-slot`            | Notes                                                    |
| -------------------- | ---------------------- | -------------------------------------------------------- |
| `Toast`              | `toast-root`           | Styled Ark root.                                         |
| `ToastToaster`       | `toast-toaster`        | Styled Ark group renderer for a `createToaster()` store. |
| `ToastTitle`         | `toast-title`          | Defaults to the current toast title.                     |
| `ToastDescription`   | `toast-description`    | Defaults to the current toast description.               |
| `ToastActionTrigger` | `toast-action-trigger` | Styled Ark action button for the current toast action.   |
| `ToastCloseTrigger`  | `toast-close-trigger`  | Defaults to `CloseButton` and the `"Close toast"` label. |

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
- `ToastToaster` forwards its `label` prop to Ark's group props in `@ark-ui/react@5.39.3`.
  The accessible group name includes that label, the placement, and the focus hotkey.
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

CSS Modules read four public variables:

| Variable                           | Default                                |
| ---------------------------------- | -------------------------------------- |
| `--moduix-toast-bg`                | type-specific                          |
| `--moduix-toast-border-color`      | type-specific                          |
| `--moduix-toast-color`             | type-specific                          |
| `--moduix-toast-description-color` | `var(--moduix-color-muted-foreground)` |

The first three override every type. To theme one type, set them inside a `[data-type='success']`
(or `warning`, `error`, `info`) selector. Size, spacing, typography, motion, and the action and
close trigger styles come from foundation tokens; override them with a class on the part. The
close trigger is a `CloseButton`, so `--moduix-close-button-*` variables apply to it.

The CSS keeps Ark `data-scope` and `data-part` attributes intact, styles state through root
`data-state` and `data-type`, and consumes Ark runtime variables. Moduix `data-slot` hooks are
layered on top for stable consumer selectors.

On viewports up to and including `40rem`, every `top-*` placement is centered at the top and
every `bottom-*` placement is centered at the bottom. Toasts keep their default `20rem` width
and shrink to fit between Ark's `offsets` and horizontal safe-area insets on narrower screens.
The vertical placement, stack animations, and `gap` between toasts remain Ark-owned; `gap` does
not control viewport padding. Above `40rem`, the configured corner or center placement applies.

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `ToastTitle` and `ToastDescription` can render the current toast context values without
  repeating children in every render prop.
- `ToastCloseTrigger` uses the moduix `CloseButton` by default and keeps the default
  accessible label. It only positions the button in the top inline-end corner.
- Omitting `ToastToaster` children opts into the standard moduix renderer. Pass the Ark render prop to
  customize the layout, individual parts, or close icon.
- `ToastToaster` owns portal transport directly and keeps toast anatomy independent from mounting.
- moduix re-exports `useToastContext` for custom child parts.

## Agent notes

- Ark's `createToaster` store is the public state model.
- Keep `Toast` as the outer node inside `ToastToaster` render props; Ark relies on it for layout,
  measurement, and dismiss lifecycle.
- Preserve Ark placement values. Do not map them back to legacy `bottom-right` style names.
- Preserve Ark `action` instead of legacy `actionProps`.
- Preserve Ark runtime CSS variables and the required translate/scale/opacity/height styles on
  `Toast`.