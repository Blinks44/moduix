import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-input-only.module.css';

export default function InputOnlyColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#0f172a')}>
      <ColorPicker.Label>Hex color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <div class={styles.controlSwatch}>
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </div>
      </ColorPicker.Control>
    </ColorPicker>
  );
}