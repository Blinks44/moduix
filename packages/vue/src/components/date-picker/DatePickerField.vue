<script setup lang="ts">
import type {
  DatePickerClearTriggerProps,
  DatePickerControlProps,
  DatePickerInputProps,
  DatePickerTriggerProps,
} from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DatePickerClearTrigger from './DatePickerClearTrigger.vue';
import DatePickerControl from './DatePickerControl.vue';
import DatePickerInput from './DatePickerInput.vue';
import DatePickerTrigger from './DatePickerTrigger.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DatePickerControlProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  clearLabel?: string;
  clearTriggerProps?: DatePickerClearTriggerProps;
  inputProps?: DatePickerInputProps;
  placeholder?: DatePickerInputProps['placeholder'];
  triggerLabel?: string;
  triggerProps?: DatePickerTriggerProps;
}

const props = defineProps<Props>();
defineSlots<{}>();

const attrs = useAttrs();
const inputProps = computed(() => ({
  ...(props.placeholder === undefined ? {} : { placeholder: props.placeholder }),
  ...props.inputProps,
  index: 0,
}));
const clearTriggerProps = computed(() => ({
  ...(props.clearLabel === undefined ? {} : { 'aria-label': props.clearLabel }),
  ...props.clearTriggerProps,
}));
const triggerProps = computed(() => ({
  ...(props.triggerLabel === undefined ? {} : { 'aria-label': props.triggerLabel }),
  ...props.triggerProps,
}));
</script>

<template>
  <DatePickerControl v-bind="attrs" :as-child="false" :class="props.class">
    <DatePickerInput v-bind="inputProps" />
    <DatePickerClearTrigger v-bind="clearTriggerProps" />
    <DatePickerTrigger v-bind="triggerProps" />
  </DatePickerControl>
</template>