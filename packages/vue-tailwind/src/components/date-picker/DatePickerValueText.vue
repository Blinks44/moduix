<script setup lang="ts">
import { DatePickerValueText as ArkDatePickerValueText } from '@ark-ui/vue/date-picker';
import type {
  DatePickerValueTextProps,
  DatePickerValueTextRenderProps,
} from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerValueTextProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: (value: DatePickerValueTextRenderProps) => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerValueText
    v-if="!$slots.default"
    v-bind="attrs"
    :class="cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', props.class)"
    data-slot="date-picker-value-text"
  />
  <ArkDatePickerValueText
    v-else
    v-bind="attrs"
    :class="cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', props.class)"
    data-slot="date-picker-value-text"
  >
    <template #default="value">
      <slot v-bind="value" />
    </template>
  </ArkDatePickerValueText>
</template>