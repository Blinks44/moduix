import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerFormatSelect,
  ColorPickerView,
} from '@moduix/solid/color-picker';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/color-picker/color-picker-format-views.module.css';

export default function FormatColorPickerDemo() {
  const [format, setFormat] = createSignal<'rgba' | 'hsla' | 'hsba'>('rgba');

  return (
    <ColorPicker
      inline
      defaultValue={parseColor('#9333ea')}
      format={format()}
      onFormatChange={(details) => setFormat(details.format)}
    >
      <Stack direction="row" align="center" justify="space-between" gap="3">
        <ColorPickerLabel>Format</ColorPickerLabel>
        <ColorPickerFormatSelect aria-label="Color format" />
      </Stack>
      <ColorPickerArea />
      <ColorPickerView format="rgba">
        <div class={styles.inputRow}>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </div>
      </ColorPickerView>
      <ColorPickerView format="hsla">
        <div class={styles.inputRow}>
          <ColorPickerChannelInput channel="hue" />
          <ColorPickerChannelInput channel="saturation" />
          <ColorPickerChannelInput channel="lightness" />
        </div>
      </ColorPickerView>
      <ColorPickerView format="hsba">
        <div class={styles.inputRow}>
          <ColorPickerChannelInput channel="hue" />
          <ColorPickerChannelInput channel="saturation" />
          <ColorPickerChannelInput channel="brightness" />
        </div>
      </ColorPickerView>
    </ColorPicker>
  );
}