<script setup lang="ts">
import { ColorPickerValueSwatch as ArkColorPickerValueSwatch } from '@ark-ui/vue/color-picker';
import type { ColorPickerValueSwatchProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerValueSwatchProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerValueSwatch
    v-bind="attrs"
    :class="clsx(styles.valueSwatch, className)"
    data-slot="color-picker-value-swatch"
  />
</template>