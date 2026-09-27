<script setup lang="ts">
import { DatePickerYearSelect as ArkDatePickerYearSelect } from '@ark-ui/vue/date-picker';
import type { DatePickerYearSelectProps } from '@ark-ui/vue/date-picker';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerYearSelectProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const isList = computed(
  () => props.multiple || (props.size !== undefined && Number(props.size) > 1),
);
const selectClass =
  'peer/date-picker-select box-border h-control-sm w-full max-w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background py-1 ps-3.5 pe-[calc(var(--moduix-spacing-2)+var(--moduix-size-xs)+var(--moduix-spacing-3-5))] [font-family:inherit] [font-size:var(--moduix-date-picker-select-font-size,var(--moduix-text-sm))] [line-height:var(--moduix-date-picker-select-line-height,var(--moduix-line-height-text-sm))] text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color,opacity] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:outline-destructive aria-invalid:focus-visible:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none forced-colors:appearance-auto forced-colors:pe-3';
const indicatorClass =
  'pointer-events-none absolute end-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-disabled/date-picker-select:opacity-50 peer-data-disabled/date-picker-select:opacity-50 motion-reduce:transition-none forced-colors:hidden [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:peer-[:not([disabled]):not([data-disabled]):hover]/date-picker-select:bg-muted [@media(hover:hover)]:peer-[:not([disabled]):not([data-disabled]):hover]/date-picker-select:text-foreground';
</script>

<template>
  <span class="relative grid w-full max-w-full min-w-0" data-slot="date-picker-year-select-control">
    <ArkDatePickerYearSelect
      :ref="forwardRef"
      v-bind="attrs"
      :multiple="props.multiple"
      :size="props.size"
      :class="cn(selectClass, isList && 'h-auto appearance-auto px-3.5 py-2', props.class)"
      data-slot="date-picker-year-select"
    >
      <slot />
    </ArkDatePickerYearSelect>
    <span
      aria-hidden="true"
      :class="cn(indicatorClass, isList && 'hidden')"
      data-slot="date-picker-year-select-indicator"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>