<script setup lang="ts">
import { DrawerCloseTrigger as ArkDrawerCloseTrigger } from '@ark-ui/vue/drawer';
import type { DrawerCloseTriggerProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerCloseTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const closeTriggerClass =
  'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkDrawerCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && closeTriggerClass, className)"
    data-slot="drawer-close-trigger"
  >
    <slot />
  </ArkDrawerCloseTrigger>
</template>
