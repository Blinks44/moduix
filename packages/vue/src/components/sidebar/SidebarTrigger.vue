<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '../../internal/a11yLabels';
import { ChevronLeftIcon } from '../../internal/icons/ui/Icons';
import { useSidebar, useSidebarConfig } from './context';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'button'>, 'class'> {
  class?: HTMLAttributes['class'];
  onClick?: (event: MouseEvent) => void;
  type?: 'button' | 'reset' | 'submit';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
const { side } = useSidebarConfig();
const sidebar = useSidebar();
const collapsed = sidebar.collapsed;
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : a11yLabels.toggleSidebar,
);

const handleClick = (event: MouseEvent) => {
  props.onClick?.(event);
  if (event.defaultPrevented) return;

  sidebar.toggleSidebar();
};
</script>

<template>
  <ark.button
    v-bind="attrs"
    :type="props.type"
    :aria-label="ariaLabel"
    :aria-expanded="!collapsed"
    :class="clsx(styles.trigger, props.class)"
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