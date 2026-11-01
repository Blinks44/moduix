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
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/color-picker/color-picker-inline.module.css';

export default function InlineColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <Stack direction="row" align="center" justify="space-between" gap="3">
        <ColorPickerLabel>Inline color</ColorPickerLabel>
        <ColorPickerValueText format="hex" />
      </Stack>
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