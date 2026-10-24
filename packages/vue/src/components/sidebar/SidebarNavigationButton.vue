<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Sidebar.module.css';

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
</script>

<template>
  <ark.button
    v-bind="attrs"
    :as-child="props.asChild"
    :type="props.type"
    :aria-current="ariaCurrent"
    :class="clsx(styles.menuButton, props.class)"
    :data-active="props.active ? '' : undefined"
    :data-size="props.size"
    data-scope="sidebar"
    data-part="navigation-button"
    data-slot="sidebar-navigation-button"
  >
    <slot />
  </ark.button>
</template>