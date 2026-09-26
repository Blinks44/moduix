<script setup lang="ts">
import { ColorPickerContent as ArkColorPickerContent } from '@ark-ui/vue/color-picker';
import type { ColorPickerContentProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerContent
    v-bind="attrs"
    :class="
      cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border flex max-h-[min(32rem,var(--available-height))] w-64 max-w-[var(--available-width)] origin-[var(--transform-origin)] flex-col gap-3 overflow-auto overscroll-contain rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )
    "
    data-slot="color-picker-content"
  >
    <slot />
  </ArkColorPickerContent>
</template>