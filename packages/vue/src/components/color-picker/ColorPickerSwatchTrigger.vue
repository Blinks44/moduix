<script setup lang="ts">
import {
  ColorPickerSwatch as ArkColorPickerSwatch,
  ColorPickerSwatchIndicator as ArkColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger as ArkColorPickerSwatchTrigger,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchTriggerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerSwatchTriggerProps {
  class?: HTMLAttributes['class'];
  value: ColorPickerSwatchTriggerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerSwatchTrigger
    v-bind="attrs"
    :class="clsx(styles.swatchTrigger, className)"
    :value="value"
    data-slot="color-picker-swatch-trigger"
  >
    <slot>
      <ArkColorPickerSwatch :value="value" data-slot="color-picker-swatch" :class="styles.swatch">
        <ArkColorPickerSwatchIndicator
          data-slot="color-picker-swatch-indicator"
          :class="styles.swatchIndicator"
        >
          <CheckIcon />
        </ArkColorPickerSwatchIndicator>
      </ArkColorPickerSwatch>
    </slot>
  </ArkColorPickerSwatchTrigger>
</template>