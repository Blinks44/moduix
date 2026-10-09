<script setup lang="ts">
import { DatePickerControl as ArkDatePickerControl } from '@ark-ui/vue/date-picker';
import type { DatePickerControlProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerControlProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerControl
    v-bind="attrs"
    :class="
      cn(
        'group/date-picker-control relative flex w-full min-w-0 items-center gap-2 text-foreground',
        props.class,
      )
    "
    data-slot="date-picker-control"
  >
    <slot />
  </ArkDatePickerControl>
</template>