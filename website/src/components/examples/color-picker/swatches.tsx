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
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
} from '@moduix/react/color-picker';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function SwatchesColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#f97316')} closeOnSelect>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerSwatchGroup>
            {swatches.map((color) => (
              <ColorPickerSwatchTrigger key={color} value={color} />
            ))}
          </ColorPickerSwatchGroup>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}