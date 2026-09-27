<script setup lang="ts">
import { DatePickerPresetTrigger as ArkDatePickerPresetTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerPresetTriggerProps } from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPresetTriggerProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const value = computed(() => props.value ?? (attrs.value as DatePickerPresetTriggerProps['value']));
</script>

<template>
  <ArkDatePickerPresetTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :value="value"
    :class="
      cn(
        !props.asChild &&
          'inline-flex min-h-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-muted px-2 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring data-selected:bg-primary data-selected:text-primary-foreground motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:bg-accent',
        props.class,
      )
    "
    data-slot="date-picker-preset-trigger"
  >
    <slot />
  </ArkDatePickerPresetTrigger>
</template>