<script setup lang="ts">
import { DateInputRoot as ArkDateInputRoot } from '@ark-ui/vue/date-input';
import type {
  DateInputDateValue,
  DateInputFocusChangeDetails,
  DateInputRootProps,
  DateInputValueChangeDetails,
} from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

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
</script>

<template>
  <ArkDateInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
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