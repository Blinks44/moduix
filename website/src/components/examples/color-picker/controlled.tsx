import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerSliders,
} from '@moduix/react/color-picker';
import { useState } from 'react';

export default function ControlledColorPickerDemo() {
  const [value, setValue] = useState(() => parseColor('#16a34a'));

  return (
    <ColorPicker value={value} onValueChange={(details) => setValue(details.value)}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerSliders />
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}