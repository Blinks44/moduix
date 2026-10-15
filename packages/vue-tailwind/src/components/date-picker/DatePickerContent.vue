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
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border max-h-[min(var(--available-height,100dvh),calc(100dvh-2rem))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100%))] origin-[var(--transform-origin)] overflow-auto rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:data-[state]:[animation-delay:0ms] motion-reduce:data-[state]:[animation-duration:1ms]',
        props.class,
      )
    "
    data-slot="date-picker-content"
  >
    <slot />
  </ArkDatePickerContent>
</template>