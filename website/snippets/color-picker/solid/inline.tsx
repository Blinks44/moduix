import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
import styles from '@/components/examples/color-picker/color-picker-inline.module.css';

export default function InlineColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <div class={styles.valueRow}>
        <ColorPicker.Label>Inline color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Area />
      <ColorPicker.Sliders />
      <ColorPicker.View format="rgba">
        <div class={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
    </ColorPicker>
  );
}