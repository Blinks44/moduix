<script setup lang="ts">
import { DatePickerViewControl as ArkDatePickerViewControl } from '@ark-ui/vue/date-picker';
import type { DatePickerViewControlProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerViewControl
    v-bind="attrs"
    :class="clsx(styles.viewControl, className)"
    data-slot="date-picker-view-control"
  >
    <slot />
  </ArkDatePickerViewControl>
</template>