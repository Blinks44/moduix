import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerChannelInput,
  ColorPickerValueSwatch,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-input-only.module.css';

export default function InputOnlyColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#0f172a')}>
      <ColorPickerLabel>Hex color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerValueSwatch className={styles.controlSwatch} />
      </ColorPickerControl>
    </ColorPicker>
  );
}