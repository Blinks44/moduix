<script setup lang="ts">
import {
  ColorPicker,
  parseColor,
  ColorPickerLabel,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerValueText,
  ColorPickerView,
  ColorPickerSliders,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-inline.module.css';
</script>

<template>
  <ColorPicker inline :default-value="parseColor('#2563eb')">
    <div :class="styles.valueRow">
      <ColorPickerLabel>Inline color</ColorPickerLabel>
      <ColorPickerValueText format="hex" />
    </div>
    <ColorPickerArea />
    <ColorPickerSliders />
    <ColorPickerView format="rgba">
      <div :class="styles.inputRow">
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerChannelInput channel="alpha" />
      </div>
    </ColorPickerView>
  </ColorPicker>
</template>