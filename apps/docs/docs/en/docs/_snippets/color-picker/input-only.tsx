import { ColorPicker, parseColor } from '@moduix/react';

export default function InputOnlyColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#0f172a')}>
      <ColorPicker.Label>Hex color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <div className="color-picker-control-swatch">
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </div>
      </ColorPicker.Control>
    </ColorPicker>
  );
}