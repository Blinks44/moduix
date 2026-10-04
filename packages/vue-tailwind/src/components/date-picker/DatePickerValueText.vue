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

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: (value: DatePickerValueTextRenderProps) => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerValueText
    v-bind="
      slots.default
        ? attrs
        : {
            ...attrs,
            class: cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className),
            'data-slot': 'date-picker-value-text',
          }
    "
  >
    <template v-if="slots.default" #default="value">
      <slot v-bind="value" />
    </template>
  </ArkDatePickerValueText>
</template>