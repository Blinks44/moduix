<script setup lang="ts">
import { StepsPrevTrigger as ArkStepsPrevTrigger } from '@ark-ui/vue/steps';
import type { StepsPrevTriggerProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsPrevTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsPrevTrigger
    v-bind="attrs"
    :class="
      cn(
        'inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 text-foreground transition-[background-color,border-color,color,opacity] duration-normal ease-in-out outline-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent',
        className,
      )
    "
    data-slot="steps-prev-trigger"
  >
    <slot />
  </ArkStepsPrevTrigger>
</template>