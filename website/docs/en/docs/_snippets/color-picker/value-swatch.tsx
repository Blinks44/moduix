import { ColorPicker, parseColor } from '@moduix/react/color-picker';

export default function ValueSwatchColorPickerDemo() {
  return (
    <ColorPicker className="color-picker-value-swatch-demo" defaultValue={parseColor('#dc2626')}>
      <ColorPicker.Label>Current color</ColorPicker.Label>
      <div className="color-picker-value-swatch">
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ValueSwatch />
      </div>
      <ColorPicker.ValueText format="hex" />
    </ColorPicker>
  );
}