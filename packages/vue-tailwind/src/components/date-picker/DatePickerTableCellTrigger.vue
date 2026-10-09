<script setup lang="ts">
import { DatePickerTableCellTrigger as ArkDatePickerTableCellTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerTableCellTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableCellTriggerProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableCellTrigger
    v-bind="attrs"
    :class="
      cn(
        'inline-flex h-control-sm w-full min-w-control-sm cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring data-in-hover-range:bg-muted data-in-hover-range:text-foreground data-in-range:bg-muted data-in-range:text-foreground data-outside-range:text-muted-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:border-ring data-unavailable:text-muted-foreground motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:text-accent-foreground',
        props.class,
      )
    "
    data-slot="date-picker-table-cell-trigger"
  >
    <slot />
  </ArkDatePickerTableCellTrigger>
</template>