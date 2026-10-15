<script setup lang="ts">
import { DatePickerViewTrigger as ArkDatePickerViewTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerViewTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { actionClass } from './DatePicker.variants';
import DatePickerRangeText from './DatePickerRangeText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerViewTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :class="
      cn(
        !props.asChild && [
          actionClass,
          'min-h-control-sm min-w-0 flex-1 gap-2 px-2 text-sm leading-5 font-medium text-foreground disabled:opacity-50',
        ],
        props.class,
      )
    "
    data-slot="date-picker-view-trigger"
  >
    <slot>
      <DatePickerRangeText />
      <ChevronDownIcon />
    </slot>
  </ArkDatePickerViewTrigger>
</template>