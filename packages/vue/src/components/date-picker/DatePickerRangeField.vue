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

export interface Props extends /* @vue-ignore */ DatePickerControlProps {
  class?: HTMLAttributes['class'];
  clearLabel?: string;
  clearTriggerProps?: DatePickerClearTriggerProps;
  endInputProps?: DatePickerInputProps;
  endPlaceholder?: DatePickerInputProps['placeholder'];
  startInputProps?: DatePickerInputProps;
  startPlaceholder?: DatePickerInputProps['placeholder'];
  triggerLabel?: string;
  triggerProps?: DatePickerTriggerProps;
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const startInputProps = computed(() => ({
  ...(props.startPlaceholder === undefined ? {} : { placeholder: props.startPlaceholder }),
  ...props.startInputProps,
  index: 0,
}));
const endInputProps = computed(() => ({
  ...(props.endPlaceholder === undefined ? {} : { placeholder: props.endPlaceholder }),
  ...props.endInputProps,
  index: 1,
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
  <DatePickerControl v-bind="attrs" :class="props.class">
    <DatePickerInput v-bind="startInputProps" />
    <DatePickerInput v-bind="endInputProps" />
    <DatePickerClearTrigger v-bind="clearTriggerProps" />
    <DatePickerTrigger v-bind="triggerProps" />
  </DatePickerControl>
</template>