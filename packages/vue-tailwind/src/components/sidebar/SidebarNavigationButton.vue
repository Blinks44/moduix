<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

export type SidebarNavigationButtonSize = 'sm' | 'md' | 'lg';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'button'>, 'class'> {
  active?: boolean;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  size?: SidebarNavigationButtonSize;
  type?: 'button' | 'reset' | 'submit';
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  asChild: false,
  size: 'md',
  type: 'button',
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaCurrent = computed(
  () =>
    (attrs['aria-current'] as HTMLAttributes['aria-current']) ??
    (props.active ? 'page' : undefined),
);

const navigationButtonSizes = {
  sm: 'min-h-control-sm text-xs',
  md: 'min-h-control-md',
  lg: 'min-h-control-lg',
} satisfies Record<SidebarNavigationButtonSize, string>;
const menuButtonClass = [
  'flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
  'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
  'group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-0',
  "[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  '[&>[data-scope=select][data-part=indicator]]:static [&>[data-scope=select][data-part=indicator]]:ms-auto [&>[data-scope=select][data-part=indicator]]:translate-none @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden',
  '[&>[data-slot=collapsible-indicator]]:ms-auto [&>[data-slot=collapsible-indicator]]:size-control-xs @max-[7rem]:[&>[data-slot=collapsible-indicator]]:hidden [&>[data-slot=collapsible-indicator]>svg]:size-3',
  '[&>[data-slot=menu-indicator]]:ms-auto [&>[data-slot=menu-indicator]]:size-control-xs [&>[data-slot=menu-indicator]]:leading-none [&>[data-slot=menu-indicator]]:text-muted-foreground @max-[7rem]:[&>[data-slot=menu-indicator]]:hidden [&>[data-slot=menu-indicator]>svg]:block [&>[data-slot=menu-indicator]>svg]:size-4',
];
</script>

<template>
  <ark.button
    v-bind="attrs"
    :as-child="props.asChild"
    :type="props.type"
    :aria-current="ariaCurrent"
    :class="cn(menuButtonClass, navigationButtonSizes[props.size], props.class)"
    :data-active="props.active ? '' : undefined"
    :data-size="props.size"
    data-scope="sidebar"
    data-part="navigation-button"
    data-slot="sidebar-navigation-button"
  >
    <slot />
  </ark.button>
</template>