<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';
</script>

<template>
  <ColorPicker :class="styles.root" :default-value="parseColor('#dc2626')">
    <ColorPickerLabel>Current color</ColorPickerLabel>
    <div :class="styles.valueSwatch">
      <ColorPickerTransparencyGrid />
      <ColorPickerValueSwatch />
    </div>
    <ColorPickerValueText format="hex" />
  </ColorPicker>
</template>