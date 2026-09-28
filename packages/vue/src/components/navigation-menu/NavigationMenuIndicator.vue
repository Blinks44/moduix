<script setup lang="ts">
import { NavigationMenuIndicator as ArkNavigationMenuIndicator } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuIndicatorProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="navigation-menu-indicator"
  >
    <slot />
  </ArkNavigationMenuIndicator>
</template>