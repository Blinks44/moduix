import { Button } from '@moduix/react/button';
import { CloseButton } from '@moduix/react/close-button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import { X as XIcon } from 'lucide-react';
import styles from '@/components/examples/dialog/dialog-build-from-parts.module.css';

export default function BuildFromPartsDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View notifications</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <div className={styles.header}>
            <DialogTitle className={styles.title}>Notifications</DialogTitle>
            <DialogCloseTrigger asChild>
              <CloseButton aria-label="Close dialog" className={styles.closeButton}>
                <XIcon strokeWidth={3} />
              </CloseButton>
            </DialogCloseTrigger>
            <DialogDescription>You are all caught up. Good job!</DialogDescription>
          </div>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}