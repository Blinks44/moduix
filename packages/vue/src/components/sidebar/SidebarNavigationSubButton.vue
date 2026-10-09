<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Sidebar.module.css';

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

const props = withDefaults(defineProps<Props>(), {
  active: false,
  asChild: false,
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
  <ark.a
    v-bind="attrs"
    :as-child="props.asChild"
    :aria-current="ariaCurrent"
    :class="clsx(styles.menuSubButton, props.class)"
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