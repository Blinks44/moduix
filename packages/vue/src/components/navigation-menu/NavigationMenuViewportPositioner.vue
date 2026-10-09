<script setup lang="ts">
import { NavigationMenuViewportPositioner as ArkNavigationMenuViewportPositioner } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuViewportPositionerProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuViewportPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuViewportPositioner
    v-bind="attrs"
    :class="clsx(styles.viewportPositioner, className)"
    data-slot="navigation-menu-viewport-positioner"
  >
    <slot />
  </ArkNavigationMenuViewportPositioner>
</template>