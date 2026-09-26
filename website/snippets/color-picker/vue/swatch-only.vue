<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-swatch-only.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<template>
  <ColorPicker :class="styles.root" inline :default-value="parseColor('#f97316')">
    <ColorPickerLabel>Brand color</ColorPickerLabel>
    <ColorPickerSwatchGroup>
      <ColorPickerSwatchTrigger v-for="color in swatches" :key="color" :value="color" />
    </ColorPickerSwatchGroup>
  </ColorPicker>
</template>