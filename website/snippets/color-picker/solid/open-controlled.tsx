import { Button } from '@moduix/solid/button';
import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
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
      <output>Open: {String(open())}</output>
      <Button type="button" size="sm" onClick={() => setOpen((current) => !current)}>
        {open() ? 'Close' : 'Open'}
      </Button>
    </div>
  );
}