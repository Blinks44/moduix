import { ColorPicker, parseColor } from '@moduix/solid/color-picker';
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
      <div class={styles.valueRow}>
        <ColorPicker.Label>Format</ColorPicker.Label>
        <ColorPicker.FormatSelect aria-label="Color format" />
      </div>
      <ColorPicker.Area />
      <ColorPicker.View format="rgba">
        <div class={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
      <ColorPicker.View format="hsla">
        <div class={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hue" />
          <ColorPicker.ChannelInput channel="saturation" />
          <ColorPicker.ChannelInput channel="lightness" />
        </div>
      </ColorPicker.View>
      <ColorPicker.View format="hsba">
        <div class={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hue" />
          <ColorPicker.ChannelInput channel="saturation" />
          <ColorPicker.ChannelInput channel="brightness" />
        </div>
      </ColorPicker.View>
    </ColorPicker>
  );
}