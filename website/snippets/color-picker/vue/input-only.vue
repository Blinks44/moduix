<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerChannelInput,
  ColorPickerValueSwatch,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-input-only.module.css';
</script>

<template>
  <ColorPicker :default-value="parseColor('#0f172a')">
    <ColorPickerLabel>Hex color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerValueSwatch :class="styles.controlSwatch" />
    </ColorPickerControl>
  </ColorPicker>
</template>