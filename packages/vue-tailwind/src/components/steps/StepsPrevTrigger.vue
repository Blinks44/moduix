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
        'box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 text-foreground transition-[background-color,border-color,color,opacity] duration-200 ease-in-out outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-accent',
        className,
      )
    "
    data-slot="steps-prev-trigger"
  >
    <slot />
  </ArkStepsPrevTrigger>
</template>