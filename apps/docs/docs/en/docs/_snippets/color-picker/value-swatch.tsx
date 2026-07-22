import { ColorPicker, parseColor } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ValueSwatchColorPickerDemo() {
  return (
    <PreviewLayout alignItems="center">
      <ColorPicker defaultValue={parseColor('#dc2626')}>
        <ColorPicker.Label>Current color</ColorPicker.Label>
        <div className="color-picker-value-swatch">
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </div>
        <ColorPicker.ValueText format="hex" />
      </ColorPicker>
    </PreviewLayout>
  );
}