<script setup lang="ts">
import { NavigationMenuItem as ArkNavigationMenuItem } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuItemProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuItemProps {
  class?: HTMLAttributes['class'];
  value: NavigationMenuItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :value="value"
    data-slot="navigation-menu-item"
  >
    <slot />
  </ArkNavigationMenuItem>
</template>