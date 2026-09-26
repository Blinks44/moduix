<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerSliders,
} from '@moduix/vue/color-picker';
</script>

<template>
  <ColorPicker inline :default-value="parseColor('#2563eb')">
    <ColorPickerLabel>Channels</ColorPickerLabel>
    <ColorPickerArea />
    <ColorPickerSliders />
  </ColorPicker>
</template>