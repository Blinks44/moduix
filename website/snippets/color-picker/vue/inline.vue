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
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/color-picker/color-picker-inline.module.css';
</script>

<template>
  <ColorPicker inline :default-value="parseColor('#2563eb')">
    <Stack direction="row" align="center" justify="space-between" gap="3">
      <ColorPickerLabel>Inline color</ColorPickerLabel>
      <ColorPickerValueText format="hex" />
    </Stack>
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