<script setup lang="ts">
import { DrawerDescription as ArkDrawerDescription } from '@ark-ui/vue/drawer';
import type { DrawerDescriptionProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerDescription
    v-bind="attrs"
    :class="clsx(styles.description, className)"
    data-slot="drawer-description"
  >
    <slot />
  </ArkDrawerDescription>
</template>
