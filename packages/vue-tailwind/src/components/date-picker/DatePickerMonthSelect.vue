<script setup lang="ts">
import { DatePickerMonthSelect as ArkDatePickerMonthSelect } from '@ark-ui/vue/date-picker';
import type { DatePickerMonthSelectProps } from '@ark-ui/vue/date-picker';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { selectClass, selectControlClass, selectIndicatorClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerMonthSelectProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <span :class="selectControlClass" data-slot="date-picker-month-select-control">
    <ArkDatePickerMonthSelect
      :ref="forwardRef"
      v-bind="attrs"
      :class="cn(selectClass, props.class)"
      data-slot="date-picker-month-select"
    >
      <slot />
    </ArkDatePickerMonthSelect>
    <span
      aria-hidden="true"
      :class="selectIndicatorClass"
      data-slot="date-picker-month-select-indicator"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>