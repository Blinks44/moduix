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
  'inline-flex cursor-pointer items-center gap-1 text-primary underline decoration-current/60 decoration-1 underline-offset-2 outline-0 transition-[text-decoration-color] duration-fast ease-in-out focus-visible:rounded-xs focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:decoration-current [@media(hover:hover)]:hover:decoration-current';
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