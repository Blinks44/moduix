<script setup lang="ts">
import { DatePickerNextTrigger as ArkDatePickerNextTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerNextTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { actionClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerNextTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerNextTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :class="cn(!props.asChild && [actionClass, 'size-control-sm disabled:opacity-50'], props.class)"
    data-slot="date-picker-next-trigger"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkDatePickerNextTrigger>
</template>