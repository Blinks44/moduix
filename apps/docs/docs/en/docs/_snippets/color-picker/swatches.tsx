import { ColorPicker, parseColor } from '@moduix/react';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function SwatchesColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#f97316')} closeOnSelect>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <ColorPicker.SwatchGroup>
            {swatches.map((color) => (
              <ColorPicker.SwatchTrigger key={color} value={color} />
            ))}
          </ColorPicker.SwatchGroup>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker>
  );
}