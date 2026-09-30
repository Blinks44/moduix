<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'a'>, 'class'> {
  active?: boolean;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}
const props = withDefaults(defineProps<Props>(), { active: false, asChild: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const ariaCurrent = computed<SidebarAriaCurrent | undefined>(
  () =>
    (attrs['aria-current'] as SidebarAriaCurrent | undefined) ??
    (props.active ? 'page' : undefined),
);
const buttonClass = [
  'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 text-ellipsis whitespace-nowrap text-card-foreground outline-0 transition-[background-color,border-color,color,box-shadow] duration-200 ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
  'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
  '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
];
</script>

<template>
  <ark.a
    v-bind="attrs"
    :as-child="props.asChild"
    :aria-current="ariaCurrent"
    :class="cn(buttonClass, props.class)"
    :data-active="props.active ? '' : undefined"
    data-scope="sidebar"
    data-part="navigation-sub-button"
    data-slot="sidebar-navigation-sub-button"
  >
    <template v-if="props.asChild">
      <slot />
    </template>
    <span v-else data-slot="sidebar-navigation-sub-label"><slot /></span>
  </ark.a>
</template>