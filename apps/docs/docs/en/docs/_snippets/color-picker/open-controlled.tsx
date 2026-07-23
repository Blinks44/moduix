import { Button, ColorPicker, parseColor } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function OpenControlledColorPickerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="color-picker-demo-layout">
      <ColorPicker
        defaultValue={parseColor('#14b8a6')}
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <ColorPicker.Label>Open controlled</ColorPicker.Label>
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
      <PreviewMeta>
        <output>Open: {String(open)}</output>
        <Button type="button" size="sm" onClick={() => setOpen((current) => !current)}>
          {open ? 'Close' : 'Open'}
        </Button>
      </PreviewMeta>
    </div>
  );
}