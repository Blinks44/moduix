<script setup lang="ts">
import { MenuArrow as ArkMenuArrow } from '@ark-ui/vue/menu';
import type { MenuArrowProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';
import MenuArrowTip from './MenuArrowTip.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuArrow v-bind="attrs" :class="clsx(styles.arrow, className)" data-slot="menu-arrow">
    <slot><MenuArrowTip /></slot>
  </ArkMenuArrow>
</template>