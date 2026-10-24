<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Sidebar.module.css';

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
    <slot />
  </ark.a>
</template>