import { Button } from '@moduix/solid/button';
import {
  DialogBackdrop,
  DialogContent,
  DialogPositioner,
  DialogRootProvider,
  DialogTrigger,
  useDialog,
} from '@moduix/solid/dialog';

export function DialogFromExternalState() {
  const dialog = useDialog();

  return (
    <DialogRootProvider value={dialog}>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>State is owned by useDialog().</DialogContent>
      </DialogPositioner>
    </DialogRootProvider>
  );
}