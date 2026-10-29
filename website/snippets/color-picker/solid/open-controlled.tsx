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
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function OpenControlledColorPickerDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <Stack align="center" gap="2">
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
    </Stack>
  );
}