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
  ColorPickerEyeDropperTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerSliders,
} from '@moduix/vue/color-picker';
import styles from '@/components/examples/color-picker/color-picker-compact-trigger.module.css';
</script>

<template>
  <ColorPicker :class="styles.root" :default-value="parseColor('#eb5e41')">
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
        <span :class="styles.triggerValue">
          <span :class="styles.triggerValueSwatch">
            <ColorPickerTransparencyGrid />
            <ColorPickerValueSwatch />
          </span>
          <ColorPickerValueText format="hex" />
        </span>
      </ColorPickerTrigger>
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
        <div :class="styles.sliderGroup">
          <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
          <ColorPickerSliders />
        </div>
      </ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPicker>
</template>