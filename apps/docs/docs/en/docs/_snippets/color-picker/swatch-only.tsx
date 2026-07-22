import { ColorPicker, parseColor } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function SwatchOnlyColorPickerDemo() {
  return (
    <PreviewLayout alignItems="center">
      <ColorPicker inline defaultValue={parseColor('#f97316')}>
        <ColorPicker.Label>Brand color</ColorPicker.Label>
        <ColorPicker.SwatchGroup>
          {swatches.map((color) => (
            <ColorPicker.SwatchTrigger key={color} value={color} />
          ))}
        </ColorPicker.SwatchGroup>
      </ColorPicker>
    </PreviewLayout>
  );
}