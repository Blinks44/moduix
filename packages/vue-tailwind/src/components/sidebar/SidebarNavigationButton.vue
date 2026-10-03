<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

type SidebarNavigationButtonSize = 'sm' | 'md' | 'lg';
type SidebarAriaCurrent =
  | boolean
  | 'true'
  | 'false'
  | 'page'
  | 'step'
  | 'location'
  | 'date'
  | 'time';

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
const ariaCurrent = computed<SidebarAriaCurrent | undefined>(
  () =>
    (attrs['aria-current'] as SidebarAriaCurrent | undefined) ??
    (props.active ? 'page' : undefined),
);
const buttonClass = [
  'flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-start text-sm leading-5 text-ellipsis whitespace-nowrap text-card-foreground outline-0 transition-colors duration-200 ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
  'group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:bg-transparent group-data-[state=collapsed]/sidebar-panel:px-0 group-data-[state=collapsed]/sidebar-panel:hover:bg-transparent',
  '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  '[&>[data-scope=select][data-part=indicator]]:ms-auto @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden',
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
    :class="
      cn(
        buttonClass,
        props.size === 'sm' && 'min-h-control-sm text-xs',
        props.size === 'md' && 'min-h-control-md',
        props.size === 'lg' && 'min-h-control-lg',
        props.class,
      )
    "
    :data-active="props.active ? '' : undefined"
    :data-size="props.size"
    data-scope="sidebar"
    data-part="navigation-button"
    data-slot="sidebar-navigation-button"
  >
    <slot />
  </ark.button>
</template>