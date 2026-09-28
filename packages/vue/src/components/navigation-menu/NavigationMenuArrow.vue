<script setup lang="ts">
import { NavigationMenuArrow as ArkNavigationMenuArrow } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuArrowProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuArrow
    v-bind="attrs"
    :class="clsx(styles.arrow, className)"
    data-slot="navigation-menu-arrow"
  >
    <slot />
  </ArkNavigationMenuArrow>
</template>