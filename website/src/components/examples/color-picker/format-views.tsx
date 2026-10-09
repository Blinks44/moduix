import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerFormatSelect,
  ColorPickerView,
} from '@moduix/react/color-picker';
import { useState } from 'react';
import styles from '@/components/examples/color-picker/color-picker-format-views.module.css';

export default function FormatColorPickerDemo() {
  const [format, setFormat] = useState<'rgba' | 'hsla' | 'hsba'>('rgba');

  return (
    <ColorPicker
      inline
      defaultValue={parseColor('#9333ea')}
      format={format}
      onFormatChange={(details) => setFormat(details.format)}
    >
      <div className={styles.valueRow}>
        <ColorPickerLabel>Format</ColorPickerLabel>
        <ColorPickerFormatSelect aria-label="Color format" />
      </div>
      <ColorPickerArea />
      <ColorPickerView format="rgba">
        <div className={styles.inputRow}>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </div>
      </ColorPickerView>
      <ColorPickerView format="hsla">
        <div className={styles.inputRow}>
          <ColorPickerChannelInput channel="hue" />
          <ColorPickerChannelInput channel="saturation" />
          <ColorPickerChannelInput channel="lightness" />
        </div>
      </ColorPickerView>
      <ColorPickerView format="hsba">
        <div className={styles.inputRow}>
          <ColorPickerChannelInput channel="hue" />
          <ColorPickerChannelInput channel="saturation" />
          <ColorPickerChannelInput channel="brightness" />
        </div>
      </ColorPickerView>
    </ColorPicker>
  );
}