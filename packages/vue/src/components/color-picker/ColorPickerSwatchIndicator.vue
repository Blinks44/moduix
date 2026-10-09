<script setup lang="ts">
import { ColorPickerSwatchIndicator as ArkColorPickerSwatchIndicator } from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchIndicatorProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerSwatchIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerSwatchIndicator
    v-bind="attrs"
    :class="clsx(styles.swatchIndicator, className)"
    data-slot="color-picker-swatch-indicator"
  >
    <slot>
      <CheckIcon />
    </slot>
  </ArkColorPickerSwatchIndicator>
</template>