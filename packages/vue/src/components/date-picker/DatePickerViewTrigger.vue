<script setup lang="ts">
import { DatePickerViewTrigger as ArkDatePickerViewTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerViewTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import styles from './DatePicker.module.css';
import DatePickerRangeText from './DatePickerRangeText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerViewTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.viewTrigger, className)"
    data-slot="date-picker-view-trigger"
  >
    <slot>
      <DatePickerRangeText />
      <ChevronDownIcon />
    </slot>
  </ArkDatePickerViewTrigger>
</template>