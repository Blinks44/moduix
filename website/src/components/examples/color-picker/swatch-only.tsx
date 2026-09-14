import { ColorPicker, parseColor } from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-swatch-only.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function SwatchOnlyColorPickerDemo() {
  return (
    <ColorPicker className={styles.root} inline defaultValue={parseColor('#f97316')}>
      <ColorPicker.Label>Brand color</ColorPicker.Label>
      <ColorPicker.SwatchGroup>
        {swatches.map((color) => (
          <ColorPicker.SwatchTrigger key={color} value={color} />
        ))}
      </ColorPicker.SwatchGroup>
    </ColorPicker>
  );
}