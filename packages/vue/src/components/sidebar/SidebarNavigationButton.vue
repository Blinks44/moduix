<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Sidebar.module.css';

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