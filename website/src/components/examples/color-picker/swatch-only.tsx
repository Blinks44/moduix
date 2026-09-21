import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-swatch-only.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function SwatchOnlyColorPickerDemo() {
  return (
    <ColorPicker className={styles.root} inline defaultValue={parseColor('#f97316')}>
      <ColorPickerLabel>Brand color</ColorPickerLabel>
      <ColorPickerSwatchGroup>
        {swatches.map((color) => (
          <ColorPickerSwatchTrigger key={color} value={color} />
        ))}
      </ColorPickerSwatchGroup>
    </ColorPicker>
  );
}