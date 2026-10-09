<script setup lang="ts">
import { ColorPickerValueText as ArkColorPickerValueText } from '@ark-ui/vue/color-picker';
import type { ColorPickerValueTextProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerValueText
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="color-picker-value-text"
  />
</template>