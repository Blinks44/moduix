# AlertDialog

AlertDialog is a thin wrapper over the Base UI `AlertDialog` primitive for destructive or blocking
confirmation flows.

`AlertDialog` owns open state. `AlertDialogTrigger` opens the surface. `AlertDialogContent` is the
default high-level path and already renders the portal, backdrop, viewport, and popup with the
library styles applied.

Use these styled parts for the common composition:

- `AlertDialogHeader`
- `AlertDialogTitle`
- `AlertDialogDescription`
- `AlertDialogBody` for longer copy or a scrollable region
- `AlertDialogFooter`
- `AlertDialogCancel`
- `AlertDialogAction`

Keep `AlertDialogAction` and `AlertDialogCancel` for actions that should close immediately. For
async confirmation flows, render your own primary button inside `AlertDialogFooter` and close the
dialog from controlled state or `createAlertDialogHandle()` after the request succeeds.

Use `className` on `AlertDialogContent` plus the documented `--alert-dialog-*` CSS properties for
visual customization. Keep deeper structure changes in JSX composition rather than new wrapper
props.
