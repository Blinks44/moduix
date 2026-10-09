<script setup lang="ts">
import { ColorPickerLabel as ArkColorPickerLabel } from '@ark-ui/vue/color-picker';
import type { ColorPickerLabelProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="color-picker-label"
  >
    <slot />
  </ArkColorPickerLabel>
</template>