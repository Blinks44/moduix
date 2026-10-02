<script setup lang="ts">
import { DrawerGrabber as ArkDrawerGrabber } from '@ark-ui/vue/drawer';
import type { DrawerGrabberProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerGrabberProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerGrabber
    v-bind="attrs"
    :class="clsx(styles.grabber, className)"
    data-slot="drawer-grabber"
  >
    <slot />
  </ArkDrawerGrabber>
</template>