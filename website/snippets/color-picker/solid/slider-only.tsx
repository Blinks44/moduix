import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerSliders,
} from '@moduix/solid/color-picker';

export default function SliderOnlyColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <ColorPickerLabel>Channels</ColorPickerLabel>
      <ColorPickerArea />
      <ColorPickerSliders />
    </ColorPicker>
  );
}