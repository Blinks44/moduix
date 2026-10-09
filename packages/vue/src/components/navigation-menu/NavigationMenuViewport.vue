<script setup lang="ts">
import { NavigationMenuViewport as ArkNavigationMenuViewport } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuViewportProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuViewport
    v-bind="attrs"
    :class="clsx(styles.viewport, className)"
    data-slot="navigation-menu-viewport"
  >
    <slot />
  </ArkNavigationMenuViewport>
</template>