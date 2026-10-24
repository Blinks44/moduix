<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { useSidebar } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'button'>, 'class'> {
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});
const slots = defineSlots<{ default?: () => unknown }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const attrs = useAttrs();
const { collapsed, side, state, toggleSidebar } = useSidebar();
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : a11yLabels.toggleSidebar,
);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
  if (!event.defaultPrevented) toggleSidebar();
};

const triggerClass = [
  'relative z-4 -mx-3.5 inline-flex size-7 flex-none translate-y-10 cursor-pointer items-center justify-center rounded-full border border-sidebar-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled',
  "[&>svg:not([class*='size-'])]:size-4 [&>svg]:transition-transform [&>svg]:duration-normal [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180",
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
    :data-state="state"
    data-scope="sidebar"
    data-part="trigger"
    data-slot="sidebar-trigger"
  >
    <ChevronLeftIcon v-if="!slots.default" />
    <slot v-else />
  </ark.button>
</template>