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
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>State is owned by useDialog().</DialogContent>
      </DialogPositioner>
    </DialogRootProvider>
  );
}