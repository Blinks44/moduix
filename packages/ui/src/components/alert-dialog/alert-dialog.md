# Alert Dialog

`AlertDialog` is a moduix modal confirmation dialog for destructive, irreversible, or blocking
decisions. It wraps Base UI alert-dialog primitives, but the public component you should use is the
moduix composition: styled trigger, portal, backdrop, centered viewport, popup, header/body/footer,
and close/action buttons.

Use `AlertDialog` when the user must explicitly choose before continuing. Use `Dialog` for general
modal content and `Alert` for inline status messages.

## Basic usage

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'moduix';

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Discard draft</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard draft?</AlertDialogTitle>
          <AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

`AlertDialogContent` renders the full overlay structure for the common case:

```text
AlertDialogContent
├─ AlertDialogPortal
│  ├─ AlertDialogBackdrop
│  └─ AlertDialogViewport
│     └─ AlertDialogPopup
│        └─ children
```

## Parts

| Part                     | Element        | Slot data attribute                    | Purpose                                     |
| ------------------------ | -------------- | -------------------------------------- | ------------------------------------------- |
| `AlertDialog`            | none           | -                                      | Root state provider.                        |
| `AlertDialogTrigger`     | `button`       | `data-slot="alert-dialog-trigger"`     | Opens the dialog.                           |
| `AlertDialogContent`     | composition    | -                                      | Convenience overlay + popup composition.    |
| `AlertDialogPortal`      | `div` portal   | `data-slot="alert-dialog-portal"`      | Moves overlay content to the document body. |
| `AlertDialogBackdrop`    | `div`          | `data-slot="alert-dialog-backdrop"`    | Modal scrim below the popup.                |
| `AlertDialogViewport`    | `div`          | `data-slot="alert-dialog-viewport"`    | Fixed, scrollable centering container.      |
| `AlertDialogPopup`       | `div`          | `data-slot="alert-dialog-popup"`       | Dialog surface.                             |
| `AlertDialogHeader`      | `div`          | `data-slot="alert-dialog-header"`      | Groups title and description.               |
| `AlertDialogTitle`       | `h2`           | `data-slot="alert-dialog-title"`       | Accessible dialog label.                    |
| `AlertDialogDescription` | `p`            | `data-slot="alert-dialog-description"` | Accessible supporting description.          |
| `AlertDialogBody`        | `div`          | `data-slot="alert-dialog-body"`        | Optional extra content area.                |
| `AlertDialogFooter`      | `div`          | `data-slot="alert-dialog-footer"`      | Action row.                                 |
| `AlertDialogClose`       | `button`       | `data-slot="alert-dialog-close"`       | Generic close button.                       |
| `AlertDialogCancel`      | close `button` | `data-slot="alert-dialog-close"`       | Secondary close button with cancel styling. |
| `AlertDialogAction`      | close `button` | `data-slot="alert-dialog-close"`       | Primary close button with action styling.   |

Recommended anatomy:

```tsx
<AlertDialog>
  <AlertDialogTrigger />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle />
      <AlertDialogDescription />
    </AlertDialogHeader>
    <AlertDialogBody />
    <AlertDialogFooter>
      <AlertDialogCancel />
      <AlertDialogAction />
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Use low-level parts only when the default `AlertDialogContent` structure is not enough:

```tsx
<AlertDialog>
  <AlertDialogTrigger>Delete project</AlertDialogTrigger>
  <AlertDialogPortal>
    <AlertDialogBackdrop className={styles.backdrop} />
    <AlertDialogViewport className={styles.viewport}>
      <AlertDialogPopup className={styles.popup}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialogViewport>
  </AlertDialogPortal>
</AlertDialog>
```

## Public props

### `AlertDialog`

Re-exports Base UI `AlertDialog.Root` behavior and does not render an HTML element.

| Prop                   | Type                                        | Default |
| ---------------------- | ------------------------------------------- | ------- |
| `defaultOpen`          | `boolean`                                   | `false` |
| `open`                 | `boolean`                                   | -       |
| `onOpenChange`         | `(open, eventDetails) => void`              | -       |
| `onOpenChangeComplete` | `(open: boolean) => void`                   | -       |
| `actionsRef`           | ref with `close()` and `unmount()`          | -       |
| `handle`               | `AlertDialog.Handle<Payload>`               | -       |
| `defaultTriggerId`     | `string \| null`                            | -       |
| `triggerId`            | `string \| null`                            | -       |
| `children`             | `ReactNode` or `({ payload }) => ReactNode` | -       |

Use `open` with `onOpenChange` for controlled state:

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from 'moduix';
import { useState } from 'react';

function ControlledAlertDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Open controlled dialog
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish changes?</AlertDialogTitle>
            <AlertDialogDescription>
              This will make the latest version visible to all users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back to editing</AlertDialogCancel>
            <AlertDialogAction>Publish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
```

### `AlertDialogTrigger`

Extends Base UI trigger props and renders a styled native `button` by default.

| Prop           | Type                                   | Default |
| -------------- | -------------------------------------- | ------- |
| `className`    | string or state callback               | -       |
| `style`        | style object or state callback         | -       |
| `render`       | replacement element or render function | -       |
| `nativeButton` | `boolean`                              | `true`  |
| `disabled`     | `boolean`                              | `false` |
| `handle`       | `AlertDialog.Handle<Payload>`          | -       |
| `payload`      | `Payload`                              | -       |
| `id`           | `string`                               | -       |

When `render` is provided, moduix does not add the default trigger class; style the replacement
element yourself or pass a compatible component.

### `AlertDialogContent`

Extends Base UI popup props and applies them to `AlertDialogPopup`. It always renders
`AlertDialogPortal`, `AlertDialogBackdrop`, and `AlertDialogViewport` around the popup.

Useful inherited popup props include:

| Prop           | Type                                       | Default |
| -------------- | ------------------------------------------ | ------- |
| `className`    | string or state callback                   | -       |
| `style`        | style object or state callback             | -       |
| `render`       | replacement element or render function     | -       |
| `initialFocus` | focus target, callback, `true`, or `false` | -       |
| `finalFocus`   | focus target, callback, `true`, or `false` | -       |

### Low-level overlay parts

`AlertDialogPortal`, `AlertDialogBackdrop`, `AlertDialogViewport`, and `AlertDialogPopup` expose
the corresponding Base UI part props. They are exported for advanced composition and are already
used by `AlertDialogContent`.

### Text and layout parts

`AlertDialogTitle` and `AlertDialogDescription` expose Base UI title/description props. Use their
`render` prop if the default `h2` or `p` element is not appropriate.

`AlertDialogHeader`, `AlertDialogBody`, and `AlertDialogFooter` extend native `div` props.

### Close buttons

`AlertDialogClose`, `AlertDialogCancel`, and `AlertDialogAction` extend Base UI close props and
render native buttons by default. `AlertDialogCancel` and `AlertDialogAction` are styled wrappers
around `AlertDialogClose`; both close the dialog when pressed.

For asynchronous confirmation, do not use `AlertDialogAction` as the pending submit button. Use a
regular `Button` and close the dialog only after success:

```tsx
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from 'moduix';
import { useState } from 'react';

function AsyncAlertDialog() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleArchive() {
    setPending(true);
    setError('');

    try {
      await new Promise((resolve, reject) => {
        window.setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve(null);
            return;
          }

          reject(new Error('Archive failed'));
        }, 900);
      });

      setOpen(false);
    } catch {
      setError('Workspace could not be archived. Review the warning and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>Archive workspace</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            Keep the dialog open while the request is pending, then close it only after success.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <AlertDialogBody>
            <p>{error}</p>
          </AlertDialogBody>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <Button type="button" disabled={pending} onClick={handleArchive}>
            {pending ? 'Archiving...' : 'Archive'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### `createAlertDialogHandle`

Use `createAlertDialogHandle()` for detached triggers or imperative opening.

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  createAlertDialogHandle,
} from 'moduix';
import { useMemo } from 'react';

function HandleAlertDialog() {
  const alertDialogHandle = useMemo(() => createAlertDialogHandle(), []);

  return (
    <>
      <AlertDialogTrigger handle={alertDialogHandle}>Open from detached trigger</AlertDialogTrigger>
      <Button type="button" onClick={() => alertDialogHandle.open(null)}>
        Open programmatically
      </Button>

      <AlertDialog handle={alertDialogHandle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This alert dialog is connected via createAlertDialogHandle().
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
```

The handle exposes `open(triggerId)`, `openWithPayload(payload)`, `close()`, and readonly `isOpen`.

## Styling API

Every exported part accepts `className` unless it is the root. Base UI parts also accept stateful
`className` callbacks. The root has no class because it renders no DOM element.

All DOM parts include `data-slot` attributes listed in the parts table. Base UI also adds state
attributes:

| Part                                                         | State attributes                                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `AlertDialogTrigger`                                         | `data-popup-open`, `data-disabled`                                                         |
| `AlertDialogBackdrop`                                        | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`                     |
| `AlertDialogViewport`, `AlertDialogPopup`                    | `data-open`, `data-closed`, `data-nested`, `data-nested-dialog-open`, animation attributes |
| `AlertDialogClose`, `AlertDialogCancel`, `AlertDialogAction` | `data-disabled`                                                                            |

The component has no `variant`, `size`, or `tone` prop. Customize the provided CSS variables on
`AlertDialogContent`, `AlertDialogPopup`, or a parent scope:

```tsx
<AlertDialogContent className={styles.customPopup}>
  <AlertDialogHeader>
    <AlertDialogTitle>Reset environment?</AlertDialogTitle>
    <AlertDialogDescription>
      All runtime variables will return to their default values.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Reset</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
```

```css
.customPopup {
  --alert-dialog-width: 28rem;
  --alert-dialog-radius: var(--radius-md);
}
```

| Variable                                 | Default/fallback                                             | Affects                          |
| ---------------------------------------- | ------------------------------------------------------------ | -------------------------------- |
| `--alert-dialog-width`                   | `24rem`                                                      | Popup width                      |
| `--alert-dialog-max-width`               | `calc(100vw - var(--spacing-8, 2rem))`                       | Popup max width                  |
| `--alert-dialog-padding`                 | `var(--spacing-6)`                                           | Popup padding                    |
| `--alert-dialog-radius`                  | `var(--radius-lg)`                                           | Popup radius                     |
| `--alert-dialog-bg`                      | `var(--color-popover)`                                       | Popup background                 |
| `--alert-dialog-color`                   | `var(--color-popover-foreground)`                            | Popup text color                 |
| `--alert-dialog-border-width`            | `var(--border-width-sm)`                                     | Popup border width               |
| `--alert-dialog-border-color`            | `var(--color-border)`                                        | Popup border color               |
| `--alert-dialog-shadow`                  | `var(--shadow-lg)`                                           | Popup shadow                     |
| `--alert-dialog-transition`              | `var(--transition-default)`                                  | Popup opacity/scale transition   |
| `--alert-dialog-backdrop-bg`             | `var(--backdrop-bg, var(--color-overlay))`                   | Backdrop background              |
| `--alert-dialog-backdrop-blur`           | `4px`                                                        | Backdrop blur                    |
| `--alert-dialog-backdrop-transition`     | `var(--transition-default)`                                  | Backdrop transition              |
| `--alert-dialog-viewport-padding`        | `var(--spacing-4)`                                           | Viewport padding                 |
| `--alert-dialog-header-gap`              | `var(--spacing-1)`                                           | Header gap                       |
| `--alert-dialog-footer-gap`              | `var(--spacing-2)`                                           | Footer gap                       |
| `--alert-dialog-muted-color`             | `var(--color-muted-foreground)`                              | Muted text fallback              |
| `--alert-dialog-title-color`             | `var(--alert-dialog-color, var(--color-popover-foreground))` | Title color                      |
| `--alert-dialog-title-font-size`         | `var(--text-lg)`                                             | Title font size                  |
| `--alert-dialog-title-font-weight`       | `var(--weight-semibold)`                                     | Title weight                     |
| `--alert-dialog-title-line-height`       | `var(--line-height-text-lg)`                                 | Title line-height                |
| `--alert-dialog-description-color`       | `var(--alert-dialog-muted-color)`                            | Description and body color       |
| `--alert-dialog-description-font-size`   | `var(--text-md)`                                             | Description and body font size   |
| `--alert-dialog-description-line-height` | `var(--line-height-text-md)`                                 | Description and body line-height |
| `--alert-dialog-control-height`          | `var(--size-lg)`                                             | Trigger/close min-height         |
| `--alert-dialog-control-padding-x`       | `0.875rem`                                                   | Trigger/close horizontal padding |
| `--alert-dialog-control-padding-y`       | `0.5rem`                                                     | Trigger/close vertical padding   |
| `--alert-dialog-control-radius`          | `var(--radius-md)`                                           | Trigger/close radius             |
| `--alert-dialog-control-bg`              | `var(--color-background)`                                    | Trigger/close background         |
| `--alert-dialog-control-bg-hover`        | `var(--color-accent)`                                        | Trigger/close hover background   |
| `--alert-dialog-control-color`           | `var(--color-foreground)`                                    | Trigger/close text color         |
| `--alert-dialog-control-border-width`    | `var(--border-width-sm)`                                     | Trigger/close border width       |
| `--alert-dialog-control-border-color`    | `var(--color-border)`                                        | Trigger/close border color       |
| `--alert-dialog-control-font-size`       | `var(--text-md)`                                             | Trigger/close font size          |
| `--alert-dialog-control-line-height`     | `var(--line-height-text-md)`                                 | Trigger/close line-height        |
| `--alert-dialog-focus-ring-width`        | `var(--alert-dialog-control-border-width)`                   | Focus ring width                 |
| `--alert-dialog-focus-ring-color`        | `var(--color-ring)`                                          | Focus ring color                 |
| `--alert-dialog-trigger-color`           | `var(--color-destructive)`                                   | Default trigger text color       |
| `--alert-dialog-cancel-bg`               | `var(--alert-dialog-control-bg, var(--color-background))`    | Cancel button background         |
| `--alert-dialog-cancel-bg-hover`         | `var(--alert-dialog-control-bg-hover, var(--color-accent))`  | Cancel button hover background   |
| `--alert-dialog-cancel-color`            | `var(--alert-dialog-control-color, var(--color-foreground))` | Cancel button text color         |
| `--alert-dialog-cancel-border-color`     | `var(--color-border)`                                        | Cancel button border color       |
| `--alert-dialog-action-bg`               | `var(--color-primary)`                                       | Action button background         |
| `--alert-dialog-action-bg-hover`         | `var(--color-foreground)`                                    | Action button hover background   |
| `--alert-dialog-action-color`            | `var(--color-primary-foreground)`                            | Action button text color         |
| `--alert-dialog-action-border-color`     | `var(--color-primary)`                                       | Action button border color       |

## UX and accessibility

- The root uses alert-dialog semantics from Base UI. Title and description are wired to the popup
  when `AlertDialogTitle` and `AlertDialogDescription` are present.
- Focus is trapped while the dialog is open and returns to the trigger or previous focus target on
  close. Override with `initialFocus` or `finalFocus` on `AlertDialogContent` only when needed.
- Keyboard users can open the trigger with native button keys and close the dialog with Esc, unless
  you cancel that state change in `onOpenChange`.
- Backdrop clicks request close through `onOpenChange`. Keep the dialog controlled if you need to
  block closing for pending work or validation.
- Disable both cancel and custom action controls during pending destructive work to prevent duplicate
  requests.
- Prefer concise titles and descriptions. The action label should name the destructive action
  (`Delete`, `Discard`, `Archive`) rather than a vague confirmation (`OK`).

## Limitations and recommendations

- `AlertDialogContent` is always modal and always renders a backdrop. Use `Dialog` if you need
  non-modal behavior or a close icon.
- `AlertDialogAction` closes immediately because it is a close button. Use `Button` for async work,
  then call `setOpen(false)` or `handle.close()` after success.
- There is no built-in form submission API. Compose forms or custom buttons inside
  `AlertDialogBody`/`AlertDialogFooter`.
- Do not use alert dialogs for routine choices or reversible navigation. They interrupt the page and
  should be reserved for decisions that require confirmation.
- Avoid custom `render` elements that are not accessible buttons unless you also provide equivalent
  keyboard and ARIA behavior.

## Motion tokens

`AlertDialogBackdrop` and `AlertDialogPopup` now expose phase-specific motion variables. Override `--alert-dialog-backdrop-starting/ending-opacity`, `--alert-dialog-backdrop-starting/ending-blur`, and the matching `--alert-dialog-popup-starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to build fade or slide variants while keeping the default scale-in dialog behavior.

## Local changelog

- 2026-06-10: Added phase-specific backdrop and popup motion tokens so alert dialogs can be retuned to fade, slide, or mixed entry/exit effects through CSS variables without changing the default animation.