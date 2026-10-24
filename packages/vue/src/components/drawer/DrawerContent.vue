<script setup lang="ts">
import { DrawerContent as ArkDrawerContent } from '@ark-ui/vue/drawer';
import type { DrawerContentProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export type DrawerVariant = 'island';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ DrawerContentProps {
  class?: HTMLAttributes['class'];
  /** Width preset for `start` and `end` drawers: 18rem, 22rem, 28rem, or 36rem. */
  size?: DrawerSize;
  /** `island` insets the surface from the viewport edges and rounds every corner. */
  variant?: DrawerVariant;
}

const { class: className, size = 'md', variant } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    :data-size="size"
    :data-variant="variant"
    data-slot="drawer-content"
  >
    <slot />
  </ArkDrawerContent>
</template>