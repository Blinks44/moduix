<script setup lang="ts">
import {
  ColorPicker,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerChannelInput,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerHiddenInput,
  parseColor,
} from '../../src/components/color-picker';
const defaultColor = parseColor('#eb5e41');
</script>

<template>
  <ColorPicker :default-value="defaultColor" :portalled="false" default-open>
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>Content</ColorPickerContent>
    </ColorPickerPositioner>
    <ColorPickerHiddenInput />
  </ColorPicker>
</template>