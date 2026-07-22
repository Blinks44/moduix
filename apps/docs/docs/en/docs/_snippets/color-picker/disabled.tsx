import { ColorPicker, parseColor } from '@moduix/react';

export default function DisabledColorPickerDemo() {
  return (
    <ColorPicker disabled defaultValue={parseColor('#64748b')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
    </ColorPicker>
  );
}