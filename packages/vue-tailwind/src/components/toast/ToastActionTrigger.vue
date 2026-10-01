<script setup lang="ts">
import { ToastActionTrigger as ArkToastActionTrigger } from '@ark-ui/vue/toast';
import type { ToastActionTriggerProps } from '@ark-ui/vue/toast';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastActionTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const actionClass =
  'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:outline-ring motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkToastActionTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && actionClass, className)"
    data-slot="toast-action-trigger"
  >
    <slot />
  </ArkToastActionTrigger>
</template>