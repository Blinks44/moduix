import { Button } from '@moduix/react/button';
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
} from '@moduix/react/color-picker';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import { Stack } from '@moduix/react/stack';

export default function InsideDialogColorPickerDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
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