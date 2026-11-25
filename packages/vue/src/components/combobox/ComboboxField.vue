<script setup lang="ts">
import type {
  ComboboxClearTriggerProps,
  ComboboxControlProps,
  ComboboxInputProps,
  ComboboxTriggerProps,
} from '@ark-ui/vue/combobox';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import ComboboxClearTrigger from './ComboboxClearTrigger.vue';
import ComboboxControl from './ComboboxControl.vue';
import ComboboxInput from './ComboboxInput.vue';
import ComboboxTrigger from './ComboboxTrigger.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<ComboboxControlProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  clearable?: boolean;
  clearLabel?: string;
  clearTriggerProps?: ComboboxClearTriggerProps;
  inputProps?: ComboboxInputProps;
  placeholder?: ComboboxInputProps['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComboboxTriggerProps;
}

const {
  class: className,
  clearable = undefined,
  clearLabel,
  clearTriggerProps,
  inputProps,
  placeholder,
  triggerLabel,
  triggerProps,
} = defineProps<Props>();

const attrs = useAttrs();
const showClearTrigger = computed(
  () => clearable ?? (clearLabel != null || clearTriggerProps != null),
);
const resolvedInputProps = computed(() => ({
  ...(placeholder === undefined ? {} : { placeholder }),
  ...inputProps,
}));
const resolvedClearTriggerProps = computed(() => ({
  ...(clearLabel === undefined ? {} : { 'aria-label': clearLabel }),
  ...clearTriggerProps,
}));
const resolvedTriggerProps = computed(() => ({
  ...(triggerLabel === undefined ? {} : { 'aria-label': triggerLabel }),
  ...triggerProps,
}));
</script>

<template>
  <ComboboxControl v-bind="attrs" :class="className">
    <ComboboxInput v-bind="resolvedInputProps" />
    <ComboboxClearTrigger v-if="showClearTrigger" v-bind="resolvedClearTriggerProps" />
    <ComboboxTrigger v-bind="resolvedTriggerProps" />
  </ComboboxControl>
</template>