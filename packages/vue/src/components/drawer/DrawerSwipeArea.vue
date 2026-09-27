<script setup lang="ts">
import { DrawerSwipeArea as ArkDrawerSwipeArea } from '@ark-ui/vue/drawer';
import type { DrawerSwipeAreaProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerSwipeAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerSwipeArea
    v-bind="attrs"
    :class="clsx(styles.swipeArea, className)"
    data-slot="drawer-swipe-area"
  >
    <slot />
  </ArkDrawerSwipeArea>
</template>
