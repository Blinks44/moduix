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
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(var(--available-height,100dvh),calc(100dvh-2rem))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100%))] origin-(--transform-origin) overflow-auto rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        props.class,
      )
    "
    data-slot="date-picker-content"
  >
    <slot />
  </ArkDatePickerContent>
</template>