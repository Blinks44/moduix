<script setup lang="ts">
import { Check as CheckIcon, Pipette as PipetteIcon } from '@lucide/vue';
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
} from '@moduix/vue/color-picker';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/color-picker/color-picker-build-from-parts.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<template>
  <ColorPicker :default-value="parseColor('#eb5e41')">
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
            <PipetteIcon :stroke-width="2.5" />
          </ColorPickerEyeDropperTrigger>
          <div :class="styles.sliders">
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
          <ColorPickerSwatchTrigger v-for="color in swatches" :key="color" :value="color">
            <ColorPickerSwatch :value="color">
              <ColorPickerSwatchIndicator
                ><CheckIcon :stroke-width="3"
              /></ColorPickerSwatchIndicator>
            </ColorPickerSwatch>
          </ColorPickerSwatchTrigger>
        </ColorPickerSwatchGroup>
      </ColorPickerContent>
    </ColorPickerPositioner>
    <ColorPickerHiddenInput />
  </ColorPicker>
</template>