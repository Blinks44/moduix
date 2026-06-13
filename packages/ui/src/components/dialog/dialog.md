# Dialog

`Dialog` is a moduix modal or non-modal popup that opens on top of the page. It wraps Base UI
dialog primitives with styled parts, a convenience composition wrapper (`DialogContent`), and a
close icon helper (`DialogCloseIcon`).

Use `Dialog` for general modal content — forms, detail panels, multi-step flows. Use `AlertDialog`
when the user must explicitly confirm a destructive or irreversible action.

Upstream primitive docs: https://base-ui.com/react/components/dialog.md

## Basic usage

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'moduix';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>View notifications</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

`DialogContent` renders the full overlay structure for the common case:

```text
DialogContent
├─ DialogPortal
│  ├─ DialogBackdrop          (only when modal={true})
│  └─ DialogViewport
│     └─ DialogPopup
│        └─ children
```

## Parts

| Part                | Element      | Slot data attribute              | Purpose                                     |
| ------------------- | ------------ | -------------------------------- | ------------------------------------------- |
| `Dialog`            | none         | -                                | Root state provider.                        |
| `DialogTrigger`     | `button`     | `data-slot="dialog-trigger"`     | Opens the dialog.                           |
| `DialogContent`     | composition  | -                                | Convenience overlay + popup composition.    |
| `DialogPortal`      | `div` portal | `data-slot="dialog-portal"`      | Moves overlay content to the document body. |
| `DialogBackdrop`    | `div`        | `data-slot="dialog-backdrop"`    | Modal scrim below the popup.                |
| `DialogViewport`    | `div`        | `data-slot="dialog-viewport"`    | Fixed, scrollable centering container.      |
| `DialogPopup`       | `div`        | `data-slot="dialog-popup"`       | Dialog surface.                             |
| `DialogHeader`      | `div`        | `data-slot="dialog-header"`      | Groups title, description, and close icon.  |
| `DialogTitle`       | `h2`         | `data-slot="dialog-title"`       | Accessible dialog label.                    |
| `DialogDescription` | `p`          | `data-slot="dialog-description"` | Accessible supporting description.          |
| `DialogBody`        | `div`        | `data-slot="dialog-body"`        | Optional extra content area.                |
| `DialogFooter`      | `div`        | `data-slot="dialog-footer"`      | Action row.                                 |
| `DialogClose`       | `button`     | `data-slot="dialog-close"`       | Generic close button.                       |
| `DialogCloseIcon`   | `button`     | `data-slot="dialog-close-icon"`  | Icon close button backed by `CloseButton`.  |

Recommended anatomy:

```tsx
<Dialog>
  <DialogTrigger />
  <DialogContent>
    <DialogHeader>
      <DialogTitle />
      <DialogCloseIcon /> {/* optional */}
      <DialogDescription />
    </DialogHeader>
    <DialogBody /> {/* optional */}
    <DialogFooter>
      <DialogClose />
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Use low-level parts only when `DialogContent` structure is not enough:

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPortal keepMounted>
    <DialogBackdrop forceRender />
    <DialogViewport>
      <DialogPopup>{/* content */}</DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>
```

## Public props

### `Dialog`

Renders no HTML element. Wraps Base UI `Dialog.Root` and provides modal mode to `DialogContent` via
context so consumers do not pass `modal` in two places.

| Prop                   | Type                                        | Default |
| ---------------------- | ------------------------------------------- | ------- |
| `modal`                | `true \| false \| "trap-focus"`             | `true`  |
| `defaultOpen`          | `boolean`                                   | `false` |
| `open`                 | `boolean`                                   | -       |
| `onOpenChange`         | `(open, eventDetails) => void`              | -       |
| `onOpenChangeComplete` | `(open: boolean) => void`                   | -       |
| `actionsRef`           | ref with `close()` and `unmount()`          | -       |
| `handle`               | `Dialog.Handle<Payload>`                    | -       |
| `defaultTriggerId`     | `string \| null`                            | -       |
| `triggerId`            | `string \| null`                            | -       |
| `children`             | `ReactNode` or `({ payload }) => ReactNode` | -       |

**Modal modes:**

- `true` (default): Traps focus, blocks pointer events outside, `DialogContent` renders a backdrop.
- `false`: No focus trap, no pointer blocking. `DialogContent` renders no backdrop.
- `"trap-focus"`: Traps keyboard focus but allows pointer interaction outside. `DialogContent`
  renders no backdrop.

Use `open` and `onOpenChange` for controlled state:

```tsx
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'moduix';

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish changes?</DialogTitle>
            <DialogDescription>
              This will make the latest version visible to all users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Back to editing</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### `DialogTrigger`

Extends Base UI trigger props. Renders a styled native `button` by default.

| Prop        | Type                                   | Default |
| ----------- | -------------------------------------- | ------- |
| `className` | string or state callback               | -       |
| `style`     | style object or state callback         | -       |
| `render`    | replacement element or render function | -       |
| `disabled`  | `boolean`                              | `false` |
| `handle`    | `Dialog.Handle<Payload>`               | -       |
| `payload`   | `Payload`                              | -       |
| `id`        | `string`                               | -       |

When `render` is provided, moduix does not add the default trigger class. Style the replacement
element yourself or pass a compatible component:

```tsx
<DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
```

### `DialogContent`

Extends Base UI popup props and applies them to `DialogPopup`. Always renders `DialogPortal` and
`DialogViewport`. Renders `DialogBackdrop` only when `modal={true}` on the parent `Dialog`.

| Prop           | Type                                       | Default |
| -------------- | ------------------------------------------ | ------- |
| `className`    | string or state callback                   | -       |
| `style`        | style object or state callback             | -       |
| `render`       | replacement element or render function     | -       |
| `initialFocus` | focus target, callback, `true`, or `false` | -       |
| `finalFocus`   | focus target, callback, `true`, or `false` | -       |

### Low-level overlay parts

`DialogPortal`, `DialogBackdrop`, `DialogViewport`, and `DialogPopup` expose corresponding Base UI
part props. They are exported for advanced composition and are already used internally by
`DialogContent`.

### Text and layout parts

`DialogTitle` and `DialogDescription` expose Base UI title/description props. Use their `render`
prop if the default `h2` or `p` element is not appropriate.

`DialogHeader`, `DialogBody`, and `DialogFooter` extend native `div` props.

`DialogHeader` uses a two-column grid layout: title and description span the first column, close
controls (`DialogClose` or `DialogCloseIcon`) placed directly inside the header auto-align to the
second column.

### `DialogClose` and `DialogCloseIcon`

`DialogClose` renders a styled button that closes the dialog. Use the `render` prop to replace it
with a library button:

```tsx
<DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
```

`DialogCloseIcon` renders a `CloseButton` icon by default. It is designed for placement inside
`DialogHeader`. Default `aria-label` is `"Close dialog"`.

| Prop         | Type                                   | Default          |
| ------------ | -------------------------------------- | ---------------- |
| `aria-label` | `string`                               | `"Close dialog"` |
| `children`   | `ReactNode`                            | -                |
| `className`  | string or state callback               | -                |
| `render`     | replacement element or render function | -                |

Customize the icon content via `children`:

```tsx
<DialogCloseIcon aria-label="Close">
  <span aria-hidden="true">×</span>
</DialogCloseIcon>
```

### `createDialogHandle`

Use `createDialogHandle()` for detached triggers or imperative opening.

```tsx
import {
  Button,
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'moduix';
import { useMemo } from 'react';

function HandleDialog() {
  const dialogHandle = useMemo(() => createDialogHandle(), []);

  return (
    <>
      <DialogTrigger handle={dialogHandle} render={<Button />}>
        Open from detached trigger
      </DialogTrigger>
      <Button type="button" onClick={() => dialogHandle.open(null)}>
        Open programmatically
      </Button>

      <Dialog handle={dialogHandle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detached trigger</DialogTitle>
            <DialogDescription>
              This dialog is connected via createDialogHandle().
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

The handle exposes `open(triggerId)`, `openWithPayload(payload)`, `close()`, and readonly `isOpen`.

## Non-modal and trap-focus modes

Use `modal={false}` when the dialog must not block page interaction:

```tsx
<Dialog modal={false}>
  <DialogTrigger render={<Button />}>Open non-modal dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Non-modal dialog</DialogTitle>
      <DialogCloseIcon />
      <DialogDescription>
        The page remains interactive because modal behavior and backdrop are disabled.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Use `modal="trap-focus"` to trap keyboard focus while keeping pointer interaction unrestricted:

```tsx
<Dialog modal="trap-focus">
  <DialogTrigger render={<Button />}>Open focus-trapped dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Focus stays inside the dialog</DialogTitle>
      <DialogCloseIcon />
      <DialogDescription>
        Outside content remains clickable, but keyboard focus stays trapped until the dialog closes.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

In both non-modal modes, `DialogContent` renders no backdrop and the viewport gets
`pointer-events: none` so it does not intercept clicks outside the popup.

## Scrollable body

Combine `DialogBody` with `ScrollArea` for dialogs with long content. Constrain the popup height via
`className`, grow the body to fill available space, and let `ScrollArea` handle overflow:

```tsx
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
} from 'moduix';
import styles from './example.module.css';

function ScrollableDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open long content</DialogTrigger>
      <DialogContent className={styles.scrollPopup}>
        <DialogHeader>
          <DialogTitle>Release checklist</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>Review all items before publishing to production.</DialogDescription>
        </DialogHeader>
        <DialogBody className={styles.scrollBody}>
          <ScrollArea className={styles.scrollArea}>{/* long content */}</ScrollArea>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

```css
/* example.module.css */
.scrollPopup {
  display: flex;
  flex-direction: column;
  height: min(42rem, calc(100dvh - var(--spacing-10)));
  overflow: hidden;
}

.scrollBody {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.scrollArea {
  height: 100%;
  min-height: 0;
}
```

## Nested dialogs

Dialogs can be nested. Base UI automatically manages z-index and applies a stacking visual effect:
the parent popup scales down and shifts, and a translucent overlay appears on it when the child
opens.

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>View notifications</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Notifications</DialogTitle>
      <DialogDescription>You are all caught up. Good job!</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Dialog>
        <DialogTrigger render={<Button />}>Customize</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize notifications</DialogTitle>
            <DialogDescription>Review your notification settings here.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Control the visual effect via `--dialog-nested-offset-y`, `--dialog-nested-scale-step`, and
`--dialog-nested-overlay-bg`.

## Custom composition

Use low-level parts for complete control over the overlay structure, for example to position the
popup at the top of the screen:

```tsx
import {
  Button,
  createDialogHandle,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from 'moduix';
import styles from './example.module.css';

function CustomCompositionDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open custom composition</DialogTrigger>
      <DialogPortal keepMounted>
        <DialogBackdrop className={styles.customBackdrop} forceRender />
        <DialogViewport className={styles.customViewport}>
          <DialogPopup className={styles.customPopup}>
            <DialogCloseIcon className={styles.customCloseIcon} />
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Portal, backdrop, viewport, popup, and close icon are composed explicitly.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p>Update the public profile fields and save changes.</p>
            </DialogBody>
            <DialogFooter>
              <DialogClose render={<Button />}>Save</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
```

```css
/* example.module.css */
.customBackdrop {
  background: rgb(15 23 42 / 0.56);
}

.customViewport {
  align-items: start;
  padding-top: var(--spacing-10);
}

.customPopup {
  position: relative;
  overflow: visible;
}

.customCloseIcon {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  color: var(--dialog-color, var(--color-popover-foreground));
  border: var(--border-width-sm) solid var(--dialog-border-color, var(--color-border));
  background: var(--dialog-bg, var(--color-popover));
}
```

## Styling API

Every exported part accepts `className`. Base UI parts also accept stateful `className` callbacks.
The root renders no DOM element and has no class.

All DOM parts include `data-slot` attributes listed in the parts table. Base UI also adds state
attributes:

| Part                             | State attributes                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `DialogTrigger`                  | `data-popup-open`, `data-disabled`                                                         |
| `DialogBackdrop`                 | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`                     |
| `DialogViewport`, `DialogPopup`  | `data-open`, `data-closed`, `data-nested`, `data-nested-dialog-open`, animation attributes |
| `DialogClose`, `DialogCloseIcon` | `data-disabled`                                                                            |

The component has no `variant`, `size`, or `tone` prop. Customize via CSS variables on
`DialogContent`, `DialogPopup`, or a parent scope:

```tsx
<DialogContent className={styles.customPopup}>{/* ... */}</DialogContent>
```

```css
.customPopup {
  --dialog-width: 40rem;
  --dialog-radius: var(--radius-xl);
  --dialog-bg: var(--color-card);
}
```

### CSS variables

| Variable                               | Default/fallback                                             | Affects                                          |
| -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| `--dialog-width`                       | `28rem`                                                      | Popup width                                      |
| `--dialog-max-width`                   | `calc(100vw - var(--spacing-8, 2rem))`                       | Popup max width                                  |
| `--dialog-padding`                     | `var(--spacing-6)`                                           | Popup padding                                    |
| `--dialog-radius`                      | `var(--radius-lg)`                                           | Popup border radius                              |
| `--dialog-bg`                          | `var(--color-popover)`                                       | Popup background                                 |
| `--dialog-color`                       | `var(--color-popover-foreground)`                            | Popup text color                                 |
| `--dialog-border-width`                | `var(--border-width-sm)`                                     | Popup border width                               |
| `--dialog-border-color`                | `var(--color-border)`                                        | Popup border color                               |
| `--dialog-shadow`                      | `var(--shadow-lg)`                                           | Popup shadow                                     |
| `--dialog-transition`                  | `var(--transition-default)`                                  | Popup opacity/scale/translate transition         |
| `--dialog-backdrop-bg`                 | `var(--backdrop-bg, var(--color-overlay))`                   | Backdrop background                              |
| `--dialog-backdrop-blur`               | `4px`                                                        | Backdrop blur                                    |
| `--dialog-backdrop-transition`         | `var(--transition-default)`                                  | Backdrop fade transition                         |
| `--dialog-viewport-padding`            | `var(--spacing-4)`                                           | Viewport padding                                 |
| `--dialog-header-gap`                  | `var(--spacing-1)`                                           | Header item gap                                  |
| `--dialog-footer-gap`                  | `var(--spacing-2)`                                           | Footer item gap                                  |
| `--dialog-footer-margin-top`           | `var(--spacing-6)`                                           | Footer top margin                                |
| `--dialog-muted-color`                 | `var(--color-muted-foreground)`                              | Shared muted text fallback                       |
| `--dialog-title-color`                 | `var(--dialog-color, var(--color-popover-foreground))`       | Title color                                      |
| `--dialog-title-font-size`             | `var(--text-lg)`                                             | Title font size                                  |
| `--dialog-title-font-weight`           | `var(--weight-semibold)`                                     | Title font weight                                |
| `--dialog-title-line-height`           | `var(--line-height-text-lg)`                                 | Title line-height                                |
| `--dialog-description-color`           | `var(--dialog-muted-color, var(--color-muted-foreground))`   | Description and body text color                  |
| `--dialog-description-font-size`       | `var(--text-md)`                                             | Description and body font size                   |
| `--dialog-description-line-height`     | `var(--line-height-text-md)`                                 | Description and body line-height                 |
| `--dialog-content-margin`              | `var(--spacing-4) 0 0`                                       | Body top margin                                  |
| `--dialog-nested-offset-y`             | `1.25rem`                                                    | Parent popup vertical offset when nested opens   |
| `--dialog-nested-scale-step`           | `0.1`                                                        | Scale reduction per nesting level                |
| `--dialog-nested-overlay-bg`           | `rgb(0 0 0 / 0.05)`                                          | Overlay tint on parent popup when nested is open |
| `--dialog-control-height`              | `var(--size-lg)`                                             | Trigger/close min-height                         |
| `--dialog-control-padding-x`           | `0.875rem`                                                   | Trigger/close horizontal padding                 |
| `--dialog-control-padding-y`           | `0.5rem`                                                     | Trigger/close vertical padding                   |
| `--dialog-control-radius`              | `var(--radius-md)`                                           | Trigger/close border radius                      |
| `--dialog-control-bg`                  | `var(--color-background)`                                    | Trigger/close background                         |
| `--dialog-control-bg-hover`            | `var(--color-accent)`                                        | Trigger/close hover background                   |
| `--dialog-control-color`               | `var(--color-foreground)`                                    | Trigger/close text color                         |
| `--dialog-control-border-width`        | `var(--border-width-sm)`                                     | Trigger/close border width                       |
| `--dialog-control-border-color`        | `var(--color-border)`                                        | Trigger/close border color                       |
| `--dialog-control-font-size`           | `var(--text-md)`                                             | Trigger/close font size                          |
| `--dialog-control-line-height`         | `var(--line-height-text-md)`                                 | Trigger/close line-height                        |
| `--dialog-focus-ring-width`            | `var(--dialog-control-border-width, var(--border-width-sm))` | Focus ring width                                 |
| `--dialog-focus-ring-color`            | `var(--color-ring)`                                          | Focus ring color                                 |
| `--dialog-close-icon-size`             | `1.75rem`                                                    | Close icon button size                           |
| `--dialog-close-icon-radius`           | `var(--radius-md)`                                           | Close icon button border radius                  |
| `--dialog-close-icon-color`            | `var(--dialog-muted-color, var(--color-muted-foreground))`   | Close icon color                                 |
| `--dialog-close-icon-color-hover`      | `var(--dialog-close-icon-color, var(--dialog-color, ...))`   | Close icon hover color                           |
| `--dialog-close-icon-bg`               | `transparent`                                                | Close icon background                            |
| `--dialog-close-icon-bg-hover`         | `var(--color-accent)`                                        | Close icon hover background                      |
| `--dialog-close-icon-focus-ring-color` | `var(--dialog-focus-ring-color, var(--color-ring))`          | Close icon focus ring color                      |
| `--dialog-close-icon-glyph-size`       | `0.75rem`                                                    | Close icon SVG size                              |

## UX and accessibility

- `Dialog` uses ARIA `role="dialog"`. Title and description are automatically wired to the popup
  when `DialogTitle` and `DialogDescription` are present inside.
- With `modal={true}` (default): focus is trapped, pointer events outside are blocked, and
  `DialogContent` renders a backdrop.
- With `modal="trap-focus"`: focus is trapped but pointer interaction outside is allowed. No
  backdrop is rendered.
- With `modal={false}`: no focus trap, no pointer blocking, no backdrop.
- Focus returns to the trigger on close. Override with `initialFocus` or `finalFocus` on
  `DialogContent` when needed.
- Pressing Esc closes the dialog unless you cancel the state change in `onOpenChange`.
- Clicking the backdrop requests close via `onOpenChange` (modal mode only).
- `DialogCloseIcon` has a default `aria-label="Close dialog"`. Always provide a meaningful label
  when customizing it.
- Avoid using non-button elements in `render` unless you replicate button keyboard and ARIA
  behavior.

## Limitations and recommendations

- `DialogContent` reads modal mode from the parent `Dialog` via context. Do not use `DialogContent`
  outside a `Dialog`.
- For `modal={false}` and `modal="trap-focus"`, `DialogContent` renders no backdrop and the
  viewport has `pointer-events: none`. Use explicit `DialogPortal`, `DialogBackdrop`, and
  `DialogViewport` if you need a backdrop in these modes.
- `DialogClose` always applies default close-button styles even when `render` is provided. Use
  `render={<Button />}` for clean button styling; the library button styles will take precedence.
- Avoid nesting more than two levels of dialogs. The nested scaling effect is designed for a single
  level.
- Do not use dialog for routine navigation or reversible tasks with minimal consequence. Use
  `Popover` or inline UI instead.

## Agent notes

- `DialogModeContext` is intentional infrastructure. It shares `modal` from `Dialog` root to
  `DialogContent` so consumers do not pass `modal` in two places. Do not remove it.
- `DialogContent` conditionally renders `DialogBackdrop` only when `modal === true`. `modal="trap-focus"` intentionally produces no backdrop — this is not a bug.
- `.viewportNonBlocking` applies `pointer-events: none` to the viewport and restores
  `pointer-events: auto` on `[data-slot="dialog-popup"]`. Both selectors are necessary and must
  not be collapsed.
- `DialogCloseIcon` renders a `CloseButton` via the `render` prop on `DialogPrimitive.Close`. Icon
  size, color, and background are bridged through `--close-button-*` CSS custom properties set in
  the `.closeIcon` class.
- `DialogTrigger` skips default styles when `render` is provided (same as `AlertDialogTrigger`).
  `DialogClose` does not skip its styles when `render` is provided — this is intentional and
  consistent with `AlertDialogClose`. The library button styles override the control class.
- `createDialogHandle` is a direct re-export of `DialogPrimitive.createHandle`.

## Motion tokens

`DialogBackdrop` and `DialogPopup` now expose phase-specific motion variables. Override the backdrop `starting/ending-opacity` and `starting/ending-blur` tokens, plus the popup `starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to build fade or slide variants while preserving the existing nested-dialog offset and scale behavior by default.

## Local changelog

- 2026-06-10: Added phase-specific backdrop and popup motion tokens so dialogs can be retuned to fade, slide, or mixed entry/exit effects through CSS variables without changing the default nested-dialog behavior.
- Initial moduix-native documentation written. Previous `dialog.md` was a verbatim copy of the
  Base UI upstream dialog documentation and did not describe the moduix wrapper at all.