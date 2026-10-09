<script setup lang="ts">
import { StepsContent as ArkStepsContent } from '@ark-ui/vue/steps';
import type { StepsContentProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsContentProps {
  class?: HTMLAttributes['class'];
  index: StepsContentProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const contentClass =
  "box-border grid min-h-40 min-w-0 place-items-center rounded-md bg-muted px-4 py-4 text-sm leading-5 text-foreground outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[orientation=vertical]:flex-auto [&[hidden]:not([hidden='until-found'])]:hidden";
</script>

<template>
  <ArkStepsContent
    v-bind="attrs"
    :class="cn(contentClass, className)"
    :index="index"
    data-slot="steps-content"
  >
    <slot />
  </ArkStepsContent>
</template>