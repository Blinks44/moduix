import {
  ColorPicker,
  parseColor,
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropperTrigger,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
} from '@moduix/solid/color-picker';
import { Stack } from '@moduix/solid/stack';
import { Check as CheckIcon, Pipette as PipetteIcon } from 'lucide-solid';
import { For } from 'solid-js';
import styles from '@/components/examples/color-picker/color-picker-build-from-parts.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];

export default function BuildFromPartsColorPickerDemo() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerChannelInput channel="alpha" />
        <ColorPickerTrigger aria-label="Open color picker">
          <ColorPickerValueSwatch />
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea>
            <ColorPickerAreaBackground />
            <ColorPickerAreaThumb />
          </ColorPickerArea>
          <Stack direction="row" align="center" gap="3">
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen">
              <PipetteIcon strokeWidth={2.5} />
            </ColorPickerEyeDropperTrigger>
            <div class={styles.sliders}>
              <ColorPickerChannelSlider channel="hue">
                <ColorPickerChannelSliderTrack />
                <ColorPickerChannelSliderThumb />
              </ColorPickerChannelSlider>
              <ColorPickerChannelSlider channel="alpha">
                <ColorPickerTransparencyGrid />
                <ColorPickerChannelSliderTrack />
                <ColorPickerChannelSliderThumb />
              </ColorPickerChannelSlider>
            </div>
          </Stack>
          <ColorPickerSwatchGroup>
            <For each={swatches}>
              {(color) => (
                <ColorPickerSwatchTrigger value={color}>
                  <ColorPickerSwatch value={color}>
                    <ColorPickerSwatchIndicator>
                      <CheckIcon strokeWidth={3} />
                    </ColorPickerSwatchIndicator>
                  </ColorPickerSwatch>
                </ColorPickerSwatchTrigger>
              )}
            </For>
          </ColorPickerSwatchGroup>
        </ColorPickerContent>
      </ColorPickerPositioner>
      <ColorPickerHiddenInput />
    </ColorPicker>
  );
}