//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const _defaultColor = '#eb5e41';

export function InlineColorPickerDemo() {
  return (
    <ColorPicker inline defaultValue={parseColor('#2563eb')}>
      <div className="color-picker-value-row">
        <ColorPicker.Label>Inline color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Area />
      <ColorPicker.ChannelSlider channel="hue" />
      <ColorPicker.ChannelSlider channel="alpha" />
      <ColorPicker.View format="rgba">
        <div className="color-picker-input-row">
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
      <ColorPicker.HiddenInput />
    </ColorPicker>
  );
}
//#endregion