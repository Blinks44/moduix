<script setup lang="ts">
import { StepsNextTrigger as ArkStepsNextTrigger } from '@ark-ui/vue/steps';
import type { StepsNextTriggerProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsNextTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsNextTrigger
    v-bind="attrs"
    :class="
      cn(
        'inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm leading-5 text-background transition-[background-color,border-color,color,opacity] duration-normal ease-in-out outline-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled [@media(hover:hover)]:[&:not(:disabled):hover]:border-[color-mix(in_srgb,var(--color-foreground)_88%,black)] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-[color-mix(in_srgb,var(--color-foreground)_88%,black)]',
        className,
      )
    "
    data-slot="steps-next-trigger"
  >
    <slot />
  </ArkStepsNextTrigger>
</template>