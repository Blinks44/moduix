import { ColorPicker, parseColor } from '@moduix/react';
import { useState } from 'react';

export default function FormatColorPickerDemo() {
  const [format, setFormat] = useState<'rgba' | 'hsla'>('rgba');

  return (
    <ColorPicker
      inline
      defaultValue={parseColor('#9333ea')}
      format={format}
      onFormatChange={(details) => setFormat(details.format as 'rgba' | 'hsla')}
    >
      <div className="color-picker-value-row">
        <ColorPicker.Label>Format</ColorPicker.Label>
        <ColorPicker.FormatSelect aria-label="Color format">
          <option value="rgba">RGBA</option>
          <option value="hsla">HSLA</option>
        </ColorPicker.FormatSelect>
      </div>
      <ColorPicker.Area />
      <ColorPicker.View format="rgba">
        <div className="color-picker-input-row">
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
      <ColorPicker.View format="hsla">
        <div className="color-picker-input-row">
          <ColorPicker.ChannelInput channel="hue" />
          <ColorPicker.ChannelInput channel="saturation" />
          <ColorPicker.ChannelInput channel="lightness" />
        </div>
      </ColorPicker.View>
    </ColorPicker>
  );
}