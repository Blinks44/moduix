<script setup lang="ts">
import { DatePickerPrevTrigger as ArkDatePickerPrevTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerPrevTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPrevTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerPrevTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.navTrigger, className)"
    data-slot="date-picker-prev-trigger"
  >
    <slot><ChevronLeftIcon /></slot>
  </ArkDatePickerPrevTrigger>
</template>