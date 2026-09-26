<script setup lang="ts">
import { ColorPickerTransparencyGrid as ArkColorPickerTransparencyGrid } from '@ark-ui/vue/color-picker';
import type { ColorPickerTransparencyGridProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerTransparencyGridProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerTransparencyGrid
    v-bind="attrs"
    :class="clsx(styles.transparencyGrid, className)"
    data-slot="color-picker-transparency-grid"
  />
</template>