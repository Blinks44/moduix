//#region demo
import { ColorPicker, parseColor } from '@moduix/react';

const _defaultColor = '#eb5e41';

export function CompactTriggerColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label="Open color picker" data-fit-content>
          <span className="color-picker-trigger-value">
            <span className="color-picker-trigger-value-swatch">
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ValueSwatch />
            </span>
            <ColorPicker.ValueText format="hex" />
          </span>
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <div className="color-picker-slider-group">
            <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
            <div className="color-picker-channel-sliders">
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
              <ColorPicker.ChannelSlider channel="alpha">
                <ColorPicker.TransparencyGrid />
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
            </div>
          </div>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker>
  );
}
//#endregion