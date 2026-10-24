import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';

export default function ValueSwatchColorPickerDemo() {
  return (
    <ColorPicker className={styles.root} defaultValue={parseColor('#dc2626')}>
      <ColorPickerLabel>Current color</ColorPickerLabel>
      <ColorPickerValueSwatch className={styles.valueSwatch} />
      <ColorPickerValueText format="hex" />
    </ColorPicker>
  );
}