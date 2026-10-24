<script setup lang="ts">
import { ColorPickerSwatchTrigger as ArkColorPickerSwatchTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchTriggerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';
import ColorPickerSwatch from './ColorPickerSwatch.vue';
import ColorPickerSwatchIndicator from './ColorPickerSwatchIndicator.vue';

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
      <ColorPickerSwatch :value="value">
        <ColorPickerSwatchIndicator />
      </ColorPickerSwatch>
    </slot>
  </ArkColorPickerSwatchTrigger>
</template>