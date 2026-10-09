<script setup lang="ts">
import { DatePickerControl as ArkDatePickerControl } from '@ark-ui/vue/date-picker';
import type { DatePickerControlProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="date-picker-control"
  >
    <slot />
  </ArkDatePickerControl>
</template>