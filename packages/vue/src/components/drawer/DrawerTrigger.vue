<script setup lang="ts">
import { DrawerTrigger as ArkDrawerTrigger } from '@ark-ui/vue/drawer';
import type { DrawerTriggerProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="drawer-trigger"
  >
    <slot />
  </ArkDrawerTrigger>
</template>