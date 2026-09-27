<script setup lang="ts">
import { DatePickerTableHeader as ArkDatePickerTableHeader } from '@ark-ui/vue/date-picker';
import type { DatePickerTableHeaderProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableHeaderProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableHeader
    v-bind="attrs"
    :class="clsx(styles.tableHeader, className)"
    data-slot="date-picker-table-header"
  >
    <slot />
  </ArkDatePickerTableHeader>
</template>