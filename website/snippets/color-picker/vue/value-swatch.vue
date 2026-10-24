<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';
</script>

<template>
  <ColorPicker :class="styles.root" :default-value="parseColor('#dc2626')">
    <ColorPickerLabel>Current color</ColorPickerLabel>
    <ColorPickerValueSwatch :class="styles.valueSwatch" />
    <ColorPickerValueText format="hex" />
  </ColorPicker>
</template>