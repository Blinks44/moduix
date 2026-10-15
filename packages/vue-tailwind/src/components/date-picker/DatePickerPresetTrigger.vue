<script setup lang="ts">
import { DatePickerPresetTrigger as ArkDatePickerPresetTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerPresetTriggerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { actionClass } from './DatePicker.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPresetTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  value: DatePickerPresetTriggerProps['value'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerPresetTrigger
    v-bind="attrs"
    :as-child="props.asChild"
    :value="props.value"
    :class="
      cn(
        !props.asChild && [
          actionClass,
          'min-h-control-sm bg-muted px-2 text-sm leading-5 text-foreground disabled:opacity-50 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):hover]:text-accent-foreground',
        ],
        props.class,
      )
    "
    data-slot="date-picker-preset-trigger"
  >
    <slot />
  </ArkDatePickerPresetTrigger>
</template>