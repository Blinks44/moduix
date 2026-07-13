//#region demo
import { ColorPicker, Dialog, parseColor } from '@moduix/react';

const _dialogTitle = 'Choose a color';
const _defaultColor = '#eb5e41';

export function InsideDialogColorPickerDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="color-picker-dialog-trigger">Open dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseIcon />
          <Dialog.Title>Choose a color</Dialog.Title>
          <Dialog.Description>
            The color picker positioner is portalled automatically for correct layering.
          </Dialog.Description>
          <div className="color-picker-dialog-body">
            <ColorPicker defaultValue={parseColor('#eb5e41')}>
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
//#endregion