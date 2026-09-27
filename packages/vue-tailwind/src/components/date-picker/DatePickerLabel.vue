<script setup lang="ts">
import { DatePickerLabel as ArkDatePickerLabel } from '@ark-ui/vue/date-picker';
import type { DatePickerLabelProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerLabelProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerLabel
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center text-sm leading-5 font-medium text-foreground select-none',
        props.class,
      )
    "
    data-slot="date-picker-label"
  >
    <slot />
  </ArkDatePickerLabel>
</template>