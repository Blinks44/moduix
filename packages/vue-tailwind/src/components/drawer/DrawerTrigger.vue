<script setup lang="ts">
import { DrawerTrigger as ArkDrawerTrigger } from '@ark-ui/vue/drawer';
import type { DrawerTriggerProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const triggerClass =
  'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkDrawerTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && triggerClass, className)"
    data-slot="drawer-trigger"
  >
    <slot />
  </ArkDrawerTrigger>
</template>