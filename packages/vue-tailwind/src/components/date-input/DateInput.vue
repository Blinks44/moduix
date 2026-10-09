<script setup lang="ts">
import { DateInputRoot as ArkDateInputRoot } from '@ark-ui/vue/date-input';
import type {
  DateInputDateValue,
  DateInputFocusChangeDetails,
  DateInputRootProps,
  DateInputValueChangeDetails,
} from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputRootProps {
  class?: HTMLAttributes['class'];
}

interface DateInputPlaceholderChangeDetails extends DateInputValueChangeDetails {
  placeholderValue: DateInputDateValue;
}

export interface Emits {
  focusChange: [details: DateInputFocusChangeDetails];
  valueChange: [details: DateInputValueChangeDetails];
  'update:modelValue': [value: DateInputDateValue[]];
  placeholderChange: [details: DateInputPlaceholderChangeDetails];
  'update:placeholderValue': [placeholderValue: DateInputDateValue];
}

const { class: className } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50';
</script>

<template>
  <ArkDateInputRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="date-input-root">
    <slot />
  </ArkDateInputRoot>
</template>