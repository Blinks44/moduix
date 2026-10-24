<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'a'>, 'class'> {
  active?: boolean;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  asChild: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaCurrent = computed(
  () =>
    (attrs['aria-current'] as HTMLAttributes['aria-current']) ??
    (props.active ? 'page' : undefined),
);

const menuSubButtonClass = [
  'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
  'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
  "[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
];
</script>

<template>
  <ark.a
    v-bind="attrs"
    :as-child="props.asChild"
    :aria-current="ariaCurrent"
    :class="cn(menuSubButtonClass, props.class)"
    :data-active="props.active ? '' : undefined"
    data-scope="sidebar"
    data-part="navigation-sub-button"
    data-slot="sidebar-navigation-sub-button"
  >
    <slot />
  </ark.a>
</template>