import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
import styles from '@/components/examples/dialog/dialog-advanced-customization.module.css';

export default function AdvancedCustomizationDialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Open custom dialog</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Custom content layout</Dialog.Title>
          <Dialog.Description>
            Compose the Ark parts directly when the layout helpers do not fit.
          </Dialog.Description>
          <Dialog.CloseTrigger
            asChild={(props) => (
              <Button {...props()} class={styles.closeButton} variant="outline">
                Close
              </Button>
            )}
          />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}