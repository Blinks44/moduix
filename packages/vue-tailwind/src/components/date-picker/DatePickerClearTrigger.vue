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
    :class="cn('absolute end-[2.125rem] top-1/2 size-control-xs -translate-y-1/2', className)"
    data-slot="date-picker-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton v-else :aria-label="ariaLabel" :aria-labelledby="ariaLabelledBy">
      <slot />
    </CloseButton>
  </ArkDatePickerClearTrigger>
</template>