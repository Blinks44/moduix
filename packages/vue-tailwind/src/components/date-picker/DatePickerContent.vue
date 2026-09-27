<script setup lang="ts">
import { DatePickerContent as ArkDatePickerContent } from '@ark-ui/vue/date-picker';
import type { DatePickerContentProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerContentProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerContent
    v-bind="attrs"
    :class="
      cn(
        'z-[calc(60+var(--layer-index,0))] w-75 max-w-[min(calc(100vw-2rem),var(--available-width))] min-w-[min(18.75rem,var(--available-width))] origin-[var(--transform-origin)] rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:min-w-72 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        props.class,
      )
    "
    data-slot="date-picker-content"
  >
    <slot />
  </ArkDatePickerContent>
</template>