<script setup lang="ts">
import { DrawerContent as ArkDrawerContent } from '@ark-ui/vue/drawer';
import type { DrawerContentProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export type DrawerVariant = 'island';

export interface Props extends /* @vue-ignore */ DrawerContentProps {
  class?: HTMLAttributes['class'];
  /** `island` insets the surface from the viewport edges and rounds every corner. */
  variant?: DrawerVariant;
}

const { class: className, variant } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    :data-variant="variant"
    data-slot="drawer-content"
  >
    <slot />
  </ArkDrawerContent>
</template>