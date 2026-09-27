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
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50';
</script>

<template>
  <ArkDateInputRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    data-slot="date-input-root"
    @focus-change="emit('focusChange', $event)"
    @value-change="emit('valueChange', $event)"
    @update:model-value="emit('update:modelValue', $event)"
    @placeholder-change="emit('placeholderChange', $event)"
    @update:placeholder-value="emit('update:placeholderValue', $event)"
  >
    <slot />
  </ArkDateInputRoot>
</template>