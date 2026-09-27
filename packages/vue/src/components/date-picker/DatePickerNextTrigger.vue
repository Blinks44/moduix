<script setup lang="ts">
import { DatePickerNextTrigger as ArkDatePickerNextTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerNextTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/internal/icons/ui/Icons';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerNextTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerNextTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.navTrigger, className)"
    data-slot="date-picker-next-trigger"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkDatePickerNextTrigger>
</template>