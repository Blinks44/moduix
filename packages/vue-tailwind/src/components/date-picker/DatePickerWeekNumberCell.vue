<script setup lang="ts">
import { DatePickerWeekNumberCell as ArkDatePickerWeekNumberCell } from '@ark-ui/vue/date-picker';
import type { DatePickerWeekNumberCellProps } from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums',
        props.class,
      )
    "
    data-slot="date-picker-week-number-cell"
  >
    <slot />
  </ArkDatePickerWeekNumberCell>
</template>