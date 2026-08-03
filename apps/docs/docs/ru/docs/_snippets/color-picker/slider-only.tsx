import { ColorPicker, parseColor } from '@moduix/react/color-picker';

export default function SliderOnlyColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <ColorPicker.Label>Channels</ColorPicker.Label>
      <ColorPicker.Area />
      <ColorPicker.Sliders />
    </ColorPicker>
  );
}