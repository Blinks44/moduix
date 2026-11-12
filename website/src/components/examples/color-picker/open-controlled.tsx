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
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

export default function OpenControlledColorPickerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Stack align="center" gap="2">
      <ColorPicker
        defaultValue={parseColor('#14b8a6')}
        open={open}
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
      <div data-preview-meta>
        <output>Open: {String(open)}</output>
        <Button type="button" size="sm" onClick={() => setOpen((current) => !current)}>
          {open ? 'Close' : 'Open'}
        </Button>
      </div>
    </Stack>
  );
}