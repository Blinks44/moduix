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
} from '@moduix/solid/color-picker';
import { createSignal } from 'solid-js';

export default function ControlledColorPickerDemo() {
  const [value, setValue] = createSignal(parseColor('#16a34a'));

  return (
    <ColorPicker value={value()} onValueChange={(details) => setValue(details.value)}>
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