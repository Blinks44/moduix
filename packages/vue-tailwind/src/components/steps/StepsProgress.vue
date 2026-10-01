<script setup lang="ts">
import { StepsProgress as ArkStepsProgress } from '@ark-ui/vue/steps';
import type { StepsProgressProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsProgressProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const progressClass =
  "relative block h-0.5 w-full overflow-hidden rounded-full bg-border before:absolute before:inset-y-0 before:start-0 before:w-[var(--percent,0%)] before:rounded-[inherit] before:bg-foreground before:transition-[width] before:duration-200 before:ease-in-out before:content-[''] motion-reduce:before:transition-none";
</script>

<template>
  <ArkStepsProgress v-bind="attrs" :class="cn(progressClass, className)" data-slot="steps-progress">
    <slot />
  </ArkStepsProgress>
</template>