<script setup lang="ts">
import { DatePickerClearTrigger as ArkDatePickerClearTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerClearTriggerProps } from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '@/components/close-button/CloseButton.vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerClearTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaLabel = computed(() => attrs['aria-label'] as string | undefined);
const ariaLabelledBy = computed(() => attrs['aria-labelledby'] as string | undefined);
const clearAttrs = computed(() => {
  if (asChild) return attrs;
  const { 'aria-label': _ariaLabel, 'aria-labelledby': _ariaLabelledBy, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <ArkDatePickerClearTrigger
    v-bind="clearAttrs"
    :as-child="true"
    :class="
      cn(
        'absolute end-[2.125rem] top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )
    "
    data-slot="date-picker-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton
      v-else
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledBy"
      :class="cn('size-control-xs [&>svg]:size-4', className)"
    >
      <slot />
    </CloseButton>
  </ArkDatePickerClearTrigger>
</template>