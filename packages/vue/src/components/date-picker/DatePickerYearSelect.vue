<script setup lang="ts">
import { DatePickerYearSelect as ArkDatePickerYearSelect } from '@ark-ui/vue/date-picker';
import type { DatePickerYearSelectProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerYearSelectProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerYearSelect
    v-bind="attrs"
    :class="clsx(styles.select, className)"
    data-slot="date-picker-year-select"
  />
</template>