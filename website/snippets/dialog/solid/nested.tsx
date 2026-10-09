import { Button } from '@moduix/solid/button';
import {
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  useDialog,
} from '@moduix/solid/dialog';
import styles from '@/components/examples/dialog/dialog-nested.module.css';

export default function NestedDialogDemo() {
  const parent = useDialog();
  const child = useDialog();

  return (
    <>
      <Button onClick={() => parent().setOpen(true)}>Open parent</Button>
      <DialogRootProvider value={parent}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Parent dialog</DialogTitle>
            <Button class={styles.openNestedButton} onClick={() => child().setOpen(true)}>
              Open nested
            </Button>
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>
      <DialogRootProvider value={child}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Nested dialog</DialogTitle>
            <DialogCloseIcon />
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>
    </>
  );
}