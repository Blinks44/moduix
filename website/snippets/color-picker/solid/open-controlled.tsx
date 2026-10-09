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
import { createSignal } from 'solid-js';
import styles from '@/components/examples/color-picker/color-picker-open-controlled.module.css';

export default function OpenControlledColorPickerDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class={styles.root}>
      <ColorPicker
        defaultValue={parseColor('#14b8a6')}
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <ColorPickerLabel>Open controlled</ColorPickerLabel>
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
      <output>Open: {String(open())}</output>
      <Button type="button" size="sm" onClick={() => setOpen((current) => !current)}>
        {open() ? 'Close' : 'Open'}
      </Button>
    </div>
  );
}