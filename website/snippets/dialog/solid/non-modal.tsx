import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';

export default function NonModalDialogDemo() {
  return (
    <Dialog modal={false}>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Open non-modal dialog</Button>} />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Non-modal dialog</Dialog.Title>
          <Dialog.Description>The page remains interactive.</Dialog.Description>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}