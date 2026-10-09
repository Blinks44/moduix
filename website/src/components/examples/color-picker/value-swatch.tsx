import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';

export default function ValueSwatchColorPickerDemo() {
  return (
    <ColorPicker className={styles.root} defaultValue={parseColor('#dc2626')}>
      <ColorPickerLabel>Current color</ColorPickerLabel>
      <div className={styles.valueSwatch}>
        <ColorPickerTransparencyGrid />
        <ColorPickerValueSwatch />
      </div>
      <ColorPickerValueText format="hex" />
    </ColorPicker>
  );
}