import { ColorPicker, parseColor } from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';

export default function ValueSwatchColorPickerDemo() {
  return (
    <ColorPicker className={styles.root} defaultValue={parseColor('#dc2626')}>
      <ColorPicker.Label>Current color</ColorPicker.Label>
      <div className={styles.valueSwatch}>
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ValueSwatch />
      </div>
      <ColorPicker.ValueText format="hex" />
    </ColorPicker>
  );
}