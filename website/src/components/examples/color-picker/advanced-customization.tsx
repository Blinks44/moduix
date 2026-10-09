import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerArea,
  ColorPickerChannelSliderTrack,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSlider,
  ColorPickerChannelInput,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
} from '@moduix/react/color-picker';

export default function AdvancedCustomizationColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker">
          <ColorPickerTransparencyGrid />
          <ColorPickerValueSwatch />
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea>
            <ColorPickerAreaBackground />
            <ColorPickerAreaThumb />
          </ColorPickerArea>
          <ColorPickerChannelSlider channel="hue">
            <ColorPickerChannelSliderTrack />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSlider>
          <ColorPickerChannelSlider channel="alpha">
            <ColorPickerTransparencyGrid />
            <ColorPickerChannelSliderTrack />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSlider>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}