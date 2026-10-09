<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
} from '@moduix/vue/color-picker';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<template>
  <ColorPicker :default-value="parseColor('#f97316')" close-on-select>
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
        <ColorPickerSwatchGroup>
          <ColorPickerSwatchTrigger v-for="color in swatches" :key="color" :value="color" />
        </ColorPickerSwatchGroup>
      </ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPicker>
</template>