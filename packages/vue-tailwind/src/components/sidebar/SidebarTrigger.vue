<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronLeftIcon } from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';
import { useSidebar, useSidebarConfig } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'button'>, 'class'> {
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}
const props = withDefaults(defineProps<Props>(), { type: 'button' });
const slots = defineSlots<{ default?: () => unknown }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const attrs = useAttrs();
const { side } = useSidebarConfig();
const sidebar = useSidebar();
const collapsed = sidebar.collapsed;
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : 'Toggle sidebar',
);
const handleClick = (event: MouseEvent) => {
  emit('click', event);
  if (event.defaultPrevented) return;
  sidebar.toggleSidebar();
};
const triggerClass = [
  'relative z-4 -mx-3.5 inline-flex size-7 flex-none translate-y-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-[background-color,color,box-shadow] duration-200 ease-in-out',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-none',
  '[&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180',
  'hover:bg-accent hover:text-accent-foreground',
];
</script>

<template>
  <ark.button
    v-bind="attrs"
    :type="props.type"
    :aria-label="ariaLabel"
    :aria-expanded="!collapsed"
    :class="cn(triggerClass, props.class)"
    @click="handleClick"
    :data-side="side"
    :data-state="collapsed ? 'collapsed' : 'expanded'"
    data-scope="sidebar"
    data-part="trigger"
    data-slot="sidebar-trigger"
  >
    <ChevronLeftIcon v-if="!slots.default" />
    <slot v-else />
  </ark.button>
</template>