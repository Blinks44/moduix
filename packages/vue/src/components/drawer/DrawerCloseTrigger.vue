<script setup lang="ts">
import { DrawerCloseTrigger as ArkDrawerCloseTrigger } from '@ark-ui/vue/drawer';
import type { DrawerCloseTriggerProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerCloseTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.closeTrigger, className)"
    data-slot="drawer-close-trigger"
  >
    <slot />
  </ArkDrawerCloseTrigger>
</template>
