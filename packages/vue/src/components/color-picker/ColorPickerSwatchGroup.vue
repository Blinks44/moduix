<script setup lang="ts">
import { ColorPickerSwatchGroup as ArkColorPickerSwatchGroup } from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchGroupProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerSwatchGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerSwatchGroup
    v-bind="attrs"
    :class="clsx(styles.swatchGroup, className)"
    data-slot="color-picker-swatch-group"
  >
    <slot />
  </ArkColorPickerSwatchGroup>
</template>