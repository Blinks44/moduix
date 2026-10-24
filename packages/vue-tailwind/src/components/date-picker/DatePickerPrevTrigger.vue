<script setup lang="ts">
import { DatePickerPrevTrigger as ArkDatePickerPrevTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerPrevTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { actionClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPrevTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerPrevTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :class="
      cn(!props.asChild && [actionClass, 'size-control-sm disabled:opacity-disabled'], props.class)
    "
    data-slot="date-picker-prev-trigger"
  >
    <slot><ChevronLeftIcon /></slot>
  </ArkDatePickerPrevTrigger>
</template>