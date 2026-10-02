<script setup lang="ts">
import { DrawerTitle as ArkDrawerTitle } from '@ark-ui/vue/drawer';
import type { DrawerTitleProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerTitle v-bind="attrs" :class="clsx(styles.title, className)" data-slot="drawer-title">
    <slot />
  </ArkDrawerTitle>
</template>