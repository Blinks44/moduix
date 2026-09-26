<script setup lang="ts">
import { ColorPickerFormatTrigger as ArkColorPickerFormatTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerFormatTriggerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerFormatTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerFormatTrigger
    v-bind="attrs"
    :class="clsx(styles.formatTrigger, className)"
    data-slot="color-picker-format-trigger"
  />
</template>