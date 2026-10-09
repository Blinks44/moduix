<script setup lang="ts">
import { NavigationMenuList as ArkNavigationMenuList } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuListProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuList
    v-bind="attrs"
    :class="clsx(styles.list, className)"
    data-slot="navigation-menu-list"
  >
    <slot />
  </ArkNavigationMenuList>
</template>