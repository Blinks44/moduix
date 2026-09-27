<script setup lang="ts">
import { DatePickerClearTrigger as ArkDatePickerClearTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerClearTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '@/components/close-button/CloseButton.vue';
import styles from './DatePicker.module.css';

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
    :class="clsx(styles.clearTrigger, className)"
    data-slot="date-picker-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton v-else :aria-label="ariaLabel" :aria-labelledby="ariaLabelledBy">
      <slot />
    </CloseButton>
  </ArkDatePickerClearTrigger>
</template>