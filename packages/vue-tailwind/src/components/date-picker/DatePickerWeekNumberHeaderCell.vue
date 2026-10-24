<script setup lang="ts">
import { DatePickerWeekNumberHeaderCell as ArkDatePickerWeekNumberHeaderCell } from '@ark-ui/vue/date-picker';
import type { DatePickerWeekNumberHeaderCellProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { tableHeaderClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerWeekNumberHeaderCellProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerWeekNumberHeaderCell
    v-bind="attrs"
    :class="cn(tableHeaderClass, props.class)"
    data-slot="date-picker-week-number-header-cell"
  >
    <slot />
  </ArkDatePickerWeekNumberHeaderCell>
</template>