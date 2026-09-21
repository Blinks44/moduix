import { Button } from '@moduix/react/button';
import {
  DialogBackdrop,
  DialogCloseIcon,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  useDialog,
} from '@moduix/react/dialog';
export default function DialogStateDemo() {
  const dialog = useDialog();
  return (
    <>
      <Button onClick={() => dialog.setOpen(true)}>
        Dialog is {dialog.open ? 'open' : 'closed'}
      </Button>
      <DialogRootProvider value={dialog}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Status</DialogTitle>
            <DialogDescription>
              <DialogContext>
                {(dialog) => <>Dialog is {dialog.open ? 'open' : 'closed'}</>}
              </DialogContext>
            </DialogDescription>
            <DialogCloseIcon />
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>
    </>
  );
}