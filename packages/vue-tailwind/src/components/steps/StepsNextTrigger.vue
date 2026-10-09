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
        'box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm leading-5 text-background transition-[background-color,border-color,color,opacity] duration-200 ease-in-out outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-foreground',
        className,
      )
    "
    data-slot="steps-next-trigger"
  >
    <slot />
  </ArkStepsNextTrigger>
</template>