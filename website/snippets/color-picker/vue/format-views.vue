<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerFormatSelect,
  ColorPickerView,
} from '@moduix/vue/color-picker';
import { ref } from 'vue';
import styles from '@/components/examples/color-picker/color-picker-format-views.module.css';

const format = ref<'rgba' | 'hsla' | 'hsba'>('rgba');
</script>

<template>
  <ColorPicker inline :default-value="parseColor('#9333ea')" v-model:format="format">
    <div :class="styles.valueRow">
      <ColorPickerLabel>Format</ColorPickerLabel>
      <ColorPickerFormatSelect aria-label="Color format" />
    </div>
    <ColorPickerArea />
    <ColorPickerView format="rgba">
      <div :class="styles.inputRow">
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerChannelInput channel="alpha" />
      </div>
    </ColorPickerView>
    <ColorPickerView format="hsla">
      <div :class="styles.inputRow">
        <ColorPickerChannelInput channel="hue" />
        <ColorPickerChannelInput channel="saturation" />
        <ColorPickerChannelInput channel="lightness" />
      </div>
    </ColorPickerView>
    <ColorPickerView format="hsba">
      <div :class="styles.inputRow">
        <ColorPickerChannelInput channel="hue" />
        <ColorPickerChannelInput channel="saturation" />
        <ColorPickerChannelInput channel="brightness" />
      </div>
    </ColorPickerView>
  </ColorPicker>
</template>