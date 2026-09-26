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
import styles from '@/components/examples/color-picker/color-picker-inside-dialog.module.css';

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
          <div className={styles.dialogBody}>
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
          </div>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}