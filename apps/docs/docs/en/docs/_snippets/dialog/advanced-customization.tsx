import { Button, Dialog } from '@moduix/react';

export default function AdvancedCustomizationDialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open custom dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Custom content layout</Dialog.Title>
          <Dialog.Description>
            Compose the Ark parts directly when the layout helpers do not fit.
          </Dialog.Description>
          <Dialog.CloseTrigger asChild>
            <Button className="dialog-advanced-close" variant="outline">
              Close
            </Button>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}