import { Button } from '@moduix/solid/button';
import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
import { Dialog } from '@moduix/solid/dialog';
import styles from '@/components/examples/color-picker/color-picker-inside-dialog.module.css';

export default function InsideDialogColorPickerDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseIcon />
          <Dialog.Title>Choose a color</Dialog.Title>
          <Dialog.Description>
            The color picker stays inside the dialog stacking context.
          </Dialog.Description>
          <div class={styles.dialogBody}>
            <ColorPicker portalled={false} defaultValue={parseColor('#eb5e41')}>
              <ColorPicker.Label>Color</ColorPicker.Label>
              <ColorPicker.Control>
                <ColorPicker.ChannelInput channel="hex" />
                <ColorPicker.Trigger aria-label="Open color picker" />
              </ColorPicker.Control>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area />
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </ColorPicker>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}