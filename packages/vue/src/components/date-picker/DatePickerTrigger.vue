<script setup lang="ts">
import { DatePickerTrigger as ArkDatePickerTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CalendarIcon } from '@/internal/icons/ui/Icons';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="date-picker-trigger"
  >
    <slot><CalendarIcon /></slot>
  </ArkDatePickerTrigger>
</template>