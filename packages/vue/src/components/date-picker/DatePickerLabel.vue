<script setup lang="ts">
import { DatePickerLabel as ArkDatePickerLabel } from '@ark-ui/vue/date-picker';
import type { DatePickerLabelProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="date-picker-label"
  >
    <slot />
  </ArkDatePickerLabel>
</template>