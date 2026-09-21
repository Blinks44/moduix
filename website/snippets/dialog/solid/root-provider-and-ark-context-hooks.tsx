import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/dialog';

export default function DialogStateDemo() {
  const dialog = useDialog();

  return (
    <>
      <Button onClick={() => dialog().setOpen(true)}>
        Dialog is {dialog().open ? 'open' : 'closed'}
      </Button>
      <DialogRootProvider value={dialog}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Status</DialogTitle>
            <DialogDescription>
              <DialogContext>
                {(dialog) => <>Dialog is {dialog().open ? 'open' : 'closed'}</>}
              </DialogContext>
            </DialogDescription>
            <DialogCloseIcon />
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>
    </>
  );
}