<script setup lang="ts">
import { DatePickerViewTrigger as ArkDatePickerViewTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerViewTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import DatePickerRangeText from './DatePickerRangeText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerViewTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :class="
      cn(
        !props.asChild &&
          'inline-flex min-h-control-sm min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-transparent px-2 text-sm leading-5 font-medium text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        props.class,
      )
    "
    data-slot="date-picker-view-trigger"
  >
    <slot>
      <DatePickerRangeText />
      <ChevronDownIcon />
    </slot>
  </ArkDatePickerViewTrigger>
</template>