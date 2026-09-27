<script setup lang="ts">
import { DrawerGrabberIndicator as ArkDrawerGrabberIndicator } from '@ark-ui/vue/drawer';
import type { DrawerGrabberIndicatorProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerGrabberIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerGrabberIndicator
    v-bind="attrs"
    :class="clsx(styles.grabberIndicator, className)"
    data-slot="drawer-grabber-indicator"
  >
    <slot />
  </ArkDrawerGrabberIndicator>
</template>
