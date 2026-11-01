<script setup lang="ts">
import {
  parseColor,
  useColorPicker,
  ColorPickerRootProvider,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerValueText,
} from '@moduix/vue/color-picker';
import { Stack } from '@moduix/vue/stack';

const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });
</script>

<template>
  <ColorPickerRootProvider :value="colorPicker">
    <Stack direction="row" align="center" justify="space-between" gap="3">
      <ColorPickerLabel>Provider color</ColorPickerLabel>
      <ColorPickerValueText format="hex" />
    </Stack>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
      </ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPickerRootProvider>
</template>