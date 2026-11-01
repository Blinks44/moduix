import { Button } from '@moduix/solid/button';
import { CloseButton } from '@moduix/solid/close-button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import { Stack } from '@moduix/solid/stack';
import { X as XIcon } from 'lucide-solid';
import styles from '@/components/examples/dialog/dialog-build-from-parts.module.css';

export default function BuildFromPartsDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>View notifications</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <Stack gap="1">
            <DialogTitle class={styles.title}>Notifications</DialogTitle>
            <DialogCloseTrigger
              asChild={(props) => (
                <CloseButton {...props()} aria-label="Close dialog" class={styles.closeButton}>
                  <XIcon strokeWidth={3} />
                </CloseButton>
              )}
            />
            <DialogDescription>You are all caught up. Good job!</DialogDescription>
          </Stack>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}