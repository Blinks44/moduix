<script setup lang="ts">
import {
  ColorPickerTransparencyGrid as ArkColorPickerTransparencyGrid,
  ColorPickerTrigger as ArkColorPickerTrigger,
  ColorPickerValueSwatch as ArkColorPickerValueSwatch,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerTriggerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="color-picker-trigger"
  >
    <slot>
      <ArkColorPickerTransparencyGrid
        data-slot="color-picker-transparency-grid"
        :class="styles.transparencyGrid"
      />
      <ArkColorPickerValueSwatch
        data-slot="color-picker-value-swatch"
        :class="styles.valueSwatch"
      />
    </slot>
  </ArkColorPickerTrigger>
</template>