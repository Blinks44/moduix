import { Dialog, useDialog } from '@moduix/solid/dialog';

export function DialogFromExternalState() {
  const dialog = useDialog();

  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>State is owned by useDialog().</Dialog.Content>
      </Dialog.Positioner>
    </Dialog.RootProvider>
  );
}