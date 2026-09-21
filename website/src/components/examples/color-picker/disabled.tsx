import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerChannelInput,
} from '@moduix/react/color-picker';

export default function DisabledColorPickerDemo() {
  return (
    <ColorPicker disabled defaultValue={parseColor('#64748b')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
    </ColorPicker>
  );
}