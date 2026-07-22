import { ColorPicker, parseColor } from '@moduix/react';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function SwatchOnlyColorPickerDemo() {
  return (
    <ColorPicker
      inline
      className="color-picker-centered-preview"
      defaultValue={parseColor('#f97316')}
    >
      <ColorPicker.Label>Brand color</ColorPicker.Label>
      <ColorPicker.SwatchGroup>
        {swatches.map((color) => (
          <ColorPicker.SwatchTrigger key={color} value={color} />
        ))}
      </ColorPicker.SwatchGroup>
    </ColorPicker>
  );
}