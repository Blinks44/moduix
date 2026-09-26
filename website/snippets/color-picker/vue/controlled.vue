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
  ColorPickerSliders,
} from '@moduix/vue/color-picker';
import { ref } from 'vue';

const value = ref(parseColor('#16a34a'));
</script>

<template>
  <ColorPicker v-model="value">
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
        <ColorPickerSliders />
      </ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPicker>
</template>