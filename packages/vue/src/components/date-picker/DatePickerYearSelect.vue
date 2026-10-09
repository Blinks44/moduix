<script setup lang="ts">
import { DatePickerYearSelect as ArkDatePickerYearSelect } from '@ark-ui/vue/date-picker';
import type { DatePickerYearSelectProps } from '@ark-ui/vue/date-picker';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerYearSelectProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <span :class="styles.selectControl" data-slot="date-picker-year-select-control">
    <ArkDatePickerYearSelect
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.select, className)"
      data-slot="date-picker-year-select"
    >
      <slot />
    </ArkDatePickerYearSelect>
    <span
      aria-hidden="true"
      :class="styles.selectIndicator"
      data-slot="date-picker-year-select-indicator"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>