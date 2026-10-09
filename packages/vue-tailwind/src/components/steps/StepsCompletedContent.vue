<script setup lang="ts">
import { StepsCompletedContent as ArkStepsCompletedContent } from '@ark-ui/vue/steps';
import type { StepsCompletedContentProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsCompletedContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const completedContentClass =
  "box-border grid min-h-40 min-w-0 place-items-center rounded-md bg-muted px-4 py-4 text-center text-sm leading-5 font-medium text-foreground outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]:not([hidden='until-found'])]:hidden";
</script>

<template>
  <ArkStepsCompletedContent
    v-bind="attrs"
    :class="cn(completedContentClass, className)"
    data-slot="steps-completed-content"
  >
    <slot />
  </ArkStepsCompletedContent>
</template>