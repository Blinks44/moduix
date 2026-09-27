<script setup lang="ts">
import { DatePickerWeekNumberHeaderCell as ArkDatePickerWeekNumberHeaderCell } from '@ark-ui/vue/date-picker';
import type { DatePickerWeekNumberHeaderCellProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums',
        props.class,
      )
    "
    data-slot="date-picker-week-number-header-cell"
  >
    <slot />
  </ArkDatePickerWeekNumberHeaderCell>
</template>