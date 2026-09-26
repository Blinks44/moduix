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
import styles from '@/components/examples/color-picker/color-picker-root-provider.module.css';

const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });
</script>

<template>
  <ColorPickerRootProvider :value="colorPicker">
    <div :class="styles.valueRow">
      <ColorPickerLabel>Provider color</ColorPickerLabel>
      <ColorPickerValueText format="hex" />
    </div>
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