<script setup lang="ts">
import { DatePickerYearSelect as ArkDatePickerYearSelect } from '@ark-ui/vue/date-picker';
import type { DatePickerYearSelectProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerYearSelectProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerYearSelect
    v-bind="attrs"
    :class="
      cn(
        'min-h-control-sm w-full min-w-0 flex-1 cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring motion-reduce:transition-none',
        props.class,
      )
    "
    data-slot="date-picker-year-select"
  >
    <slot />
  </ArkDatePickerYearSelect>
</template>