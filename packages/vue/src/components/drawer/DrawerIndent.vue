<script setup lang="ts">
import { DrawerIndent as ArkDrawerIndent } from '@ark-ui/vue/drawer';
import type { DrawerIndentProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerIndentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerIndent v-bind="attrs" :class="clsx(styles.indent, className)" data-slot="drawer-indent">
    <slot />
  </ArkDrawerIndent>
</template>