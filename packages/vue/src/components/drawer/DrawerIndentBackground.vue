<script setup lang="ts">
import { DrawerIndentBackground as ArkDrawerIndentBackground } from '@ark-ui/vue/drawer';
import type { DrawerIndentBackgroundProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerIndentBackgroundProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerIndentBackground
    v-bind="attrs"
    :class="clsx(styles.indentBackground, className)"
    data-slot="drawer-indent-background"
  >
    <slot />
  </ArkDrawerIndentBackground>
</template>