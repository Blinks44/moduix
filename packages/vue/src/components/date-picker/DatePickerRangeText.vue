<script setup lang="ts">
import { DatePickerRangeText as ArkDatePickerRangeText } from '@ark-ui/vue/date-picker';
import type { DatePickerRangeTextProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerRangeTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerRangeText
    v-bind="attrs"
    :class="clsx(styles.rangeText, className)"
    data-slot="date-picker-range-text"
  >
    <slot />
  </ArkDatePickerRangeText>
</template>