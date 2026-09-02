import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';
import styles from '@/components/examples/dialog/dialog-advanced-customization.module.css';

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
            <Button className={styles.closeButton} variant="outline">
              Close
            </Button>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}