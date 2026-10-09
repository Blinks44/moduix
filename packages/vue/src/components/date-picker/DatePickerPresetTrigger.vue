<script setup lang="ts">
import { DatePickerPresetTrigger as ArkDatePickerPresetTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerPresetTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPresetTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  value: DatePickerPresetTriggerProps['value'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerPresetTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :value="props.value"
    :class="clsx(!props.asChild && styles.presetTrigger, props.class)"
    data-slot="date-picker-preset-trigger"
  >
    <slot></slot>
  </ArkDatePickerPresetTrigger>
</template>