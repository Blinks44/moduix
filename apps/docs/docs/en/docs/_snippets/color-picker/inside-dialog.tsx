import { ColorPicker, Dialog, parseColor } from '@moduix/react';

export default function InsideDialogColorPickerDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="color-picker-dialog-trigger">Open dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseIcon />
          <Dialog.Title>Choose a color</Dialog.Title>
          <Dialog.Description>
            The color picker stays inside the dialog stacking context.
          </Dialog.Description>
          <div className="color-picker-dialog-body">
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