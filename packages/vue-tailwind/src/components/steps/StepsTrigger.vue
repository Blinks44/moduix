<script setup lang="ts">
import { StepsTrigger as ArkStepsTrigger } from '@ark-ui/vue/steps';
import type { StepsTriggerProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsTrigger
    v-bind="attrs"
    :class="
      cn(
        'group/steps-trigger relative z-1 inline-flex min-w-0 cursor-pointer items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left text-inherit no-underline outline-none select-none [font:inherit] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:items-start',
        className,
      )
    "
    data-slot="steps-trigger"
  >
    <slot />
  </ArkStepsTrigger>
</template>