<script setup lang="ts">
import { NavigationMenuItemIndicator as ArkNavigationMenuItemIndicator } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuItemIndicatorProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuItemIndicator
    v-bind="attrs"
    :class="clsx(styles.itemIndicator, className)"
    data-slot="navigation-menu-item-indicator"
  >
    <slot />
  </ArkNavigationMenuItemIndicator>
</template>