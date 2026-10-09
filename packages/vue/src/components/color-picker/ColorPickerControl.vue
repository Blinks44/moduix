<script setup lang="ts">
import { ColorPickerControl as ArkColorPickerControl } from '@ark-ui/vue/color-picker';
import type { ColorPickerControlProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="color-picker-control"
  >
    <slot />
  </ArkColorPickerControl>
</template>