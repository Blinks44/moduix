import {
  ColorPicker,
  parseColor,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerSliders,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-basic.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function ColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <div className={styles.sliderGroup}>
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPickerSliders />
          </div>
          <ColorPickerSwatchGroup>
            {swatches.map((color) => (
              <ColorPickerSwatchTrigger key={color} value={color} />
            ))}
          </ColorPickerSwatchGroup>
        </ColorPickerContent>
      </ColorPickerPositioner>
      <ColorPickerHiddenInput />
    </ColorPicker>
  );
}