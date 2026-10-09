<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerChannelInput,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-input-only.module.css';
</script>

<template>
  <ColorPicker :default-value="parseColor('#0f172a')">
    <ColorPickerLabel>Hex color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <div :class="styles.controlSwatch">
        <ColorPickerTransparencyGrid />
        <ColorPickerValueSwatch />
      </div>
    </ColorPickerControl>
  </ColorPicker>
</template>