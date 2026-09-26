import { Button } from '@moduix/solid/button';
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
import styles from '@/components/examples/dialog/dialog-advanced-customization.module.css';

export default function AdvancedCustomizationDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open custom dialog</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Custom content layout</DialogTitle>
          <DialogDescription>
            Compose the Ark parts directly when the layout helpers do not fit.
          </DialogDescription>
          <DialogCloseTrigger
            asChild={(props) => (
              <Button {...props()} class={styles.closeButton} variant="outline">
                Close
              </Button>
            )}
          />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}