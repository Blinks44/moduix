<script setup lang="ts">
import { RadioGroupIndicator as ArkRadioGroupIndicator } from '@ark-ui/vue/radio-group';
import type { RadioGroupIndicatorProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none absolute top-[var(--top)] left-[var(--left)] h-[var(--height)] w-[var(--width)] rounded-full bg-primary opacity-[0.12] [--transition-duration:var(--moduix-duration-normal)]',
        className,
      )
    "
    data-slot="radio-group-indicator"
  >
    <slot />
  </ArkRadioGroupIndicator>
</template>