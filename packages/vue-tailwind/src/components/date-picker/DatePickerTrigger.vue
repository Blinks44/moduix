<script setup lang="ts">
import { DatePickerTrigger as ArkDatePickerTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CalendarIcon } from '@/lib/moduix/icons/ui';
import { actionClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :class="
      cn(
        !props.asChild && [actionClass, 'absolute end-2 top-1/2 size-control-xs -translate-y-1/2'],
        props.class,
      )
    "
    data-slot="date-picker-trigger"
  >
    <slot><CalendarIcon /></slot>
  </ArkDatePickerTrigger>
</template>