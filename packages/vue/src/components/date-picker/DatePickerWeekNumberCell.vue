<script setup lang="ts">
import { DatePickerWeekNumberCell as ArkDatePickerWeekNumberCell } from '@ark-ui/vue/date-picker';
import type { DatePickerWeekNumberCellProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerWeekNumberCellProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const weekIndex = computed(() => props.weekIndex ?? (attrs.weekIndex as number));
const week = computed(() => props.week ?? (attrs.week as DatePickerWeekNumberCellProps['week']));
</script>

<template>
  <ArkDatePickerWeekNumberCell
    v-bind="attrs"
    :week-index="weekIndex"
    :week="week"
    :class="clsx(styles.weekNumberCell, props.class)"
    data-slot="date-picker-week-number-cell"
  >
    <slot />
  </ArkDatePickerWeekNumberCell>
</template>