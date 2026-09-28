<script setup lang="ts">
import { HoverCardTrigger as ArkHoverCardTrigger } from '@ark-ui/vue/hover-card';
import type { HoverCardTriggerProps } from '@ark-ui/vue/hover-card';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  'inline-flex cursor-pointer items-center gap-1 text-primary underline decoration-primary/60 decoration-1 underline-offset-2 outline-0 transition-[color,text-decoration-color] duration-150 ease-in-out focus-visible:rounded-xs focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:decoration-primary motion-reduce:transition-none [@media(hover:hover)]:hover:decoration-primary';
</script>

<template>
  <ArkHoverCardTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && triggerClass, className)"
    data-slot="hover-card-trigger"
  >
    <slot />
  </ArkHoverCardTrigger>
</template>