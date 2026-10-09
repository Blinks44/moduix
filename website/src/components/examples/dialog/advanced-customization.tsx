import { Button } from '@moduix/react/button';
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
import styles from '@/components/examples/dialog/dialog-advanced-customization.module.css';

export default function AdvancedCustomizationDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open custom dialog</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Custom content layout</DialogTitle>
          <DialogDescription>
            Compose the Ark parts directly when the layout helpers do not fit.
          </DialogDescription>
          <DialogCloseTrigger asChild>
            <Button className={styles.closeButton} variant="outline">
              Close
            </Button>
          </DialogCloseTrigger>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}