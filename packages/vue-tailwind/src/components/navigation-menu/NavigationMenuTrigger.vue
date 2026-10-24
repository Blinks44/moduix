<script setup lang="ts">
import { NavigationMenuTrigger as ArkNavigationMenuTrigger } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuTriggerProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuTriggerProps {
  asChild?: NavigationMenuTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  'box-border inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled data-[state=open]:bg-muted [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-[rotate] [&>svg]:duration-normal [&>svg]:ease-in-out data-[state=open]:[&>svg]:rotate-180 motion-reduce:[&>svg]:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted';
</script>

<template>
  <ArkNavigationMenuTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && triggerClass, className)"
    data-slot="navigation-menu-trigger"
  >
    <slot />
  </ArkNavigationMenuTrigger>
</template>