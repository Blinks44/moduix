<script setup lang="ts">
import { DatePickerNextTrigger as ArkDatePickerNextTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerNextTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerNextTriggerProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerNextTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :class="
      cn(
        !props.asChild &&
          'inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        props.class,
      )
    "
    data-slot="date-picker-next-trigger"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkDatePickerNextTrigger>
</template>