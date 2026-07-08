//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export function ColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <div className="color-picker-slider-group">
            <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
            <div className="color-picker-channel-sliders">
              <ColorPicker.ChannelSlider channel="hue" />
              <ColorPicker.ChannelSlider channel="alpha" />
            </div>
          </div>
          <ColorPicker.SwatchGroup>
            {swatches.map((color) => (
              <ColorPicker.SwatchTrigger key={color} value={color} />
            ))}
          </ColorPicker.SwatchGroup>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker>
  );
}
//#endregion