<script setup lang="ts">
import { NavigationMenuLink as ArkNavigationMenuLink } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuLinkProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuLinkProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const linkClass =
  "inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-disabled data-current:text-primary data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted";
</script>

<template>
  <ArkNavigationMenuLink
    v-bind="attrs"
    :class="cn(linkClass, className)"
    data-slot="navigation-menu-link"
  >
    <slot />
  </ArkNavigationMenuLink>
</template>