import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';

export default function ValueSwatchColorPickerDemo() {
  return (
    <ColorPicker class={styles.root} defaultValue={parseColor('#dc2626')}>
      <ColorPickerLabel>Current color</ColorPickerLabel>
      <div class={styles.valueSwatch}>
        <ColorPickerTransparencyGrid />
        <ColorPickerValueSwatch />
      </div>
      <ColorPickerValueText format="hex" />
    </ColorPicker>
  );
}