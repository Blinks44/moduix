import { Button } from '@moduix/solid/button';
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
} from '@moduix/solid/color-picker';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import { Stack } from '@moduix/solid/stack';

export default function InsideDialogColorPickerDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogCloseIcon />
          <DialogTitle>Choose a color</DialogTitle>
          <DialogDescription>
            The color picker stays inside the dialog stacking context.
          </DialogDescription>
          <Stack gap="1rem">
            <ColorPicker portalled={false} defaultValue={parseColor('#eb5e41')}>
              <ColorPickerLabel>Color</ColorPickerLabel>
              <ColorPickerControl>
                <ColorPickerChannelInput channel="hex" />
                <ColorPickerTrigger aria-label="Open color picker" />
              </ColorPickerControl>
              <ColorPickerPositioner>
                <ColorPickerContent>
                  <ColorPickerArea />
                </ColorPickerContent>
              </ColorPickerPositioner>
            </ColorPicker>
          </Stack>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}