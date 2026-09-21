import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerValueText,
  ColorPickerView,
  ColorPickerSliders,
} from '@moduix/react/color-picker';
import styles from '@/components/examples/color-picker/color-picker-inline.module.css';

export default function InlineColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <div className={styles.valueRow}>
        <ColorPickerLabel>Inline color</ColorPickerLabel>
        <ColorPickerValueText format="hex" />
      </div>
      <ColorPickerArea />
      <ColorPickerSliders />
      <ColorPickerView format="rgba">
        <div className={styles.inputRow}>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </div>
      </ColorPickerView>
    </ColorPicker>
  );
}