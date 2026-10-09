<script setup lang="ts">
import { MenuItemGroupLabel as ArkMenuItemGroupLabel } from '@ark-ui/vue/menu';
import type { MenuItemGroupLabelProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItemGroupLabel
    v-bind="attrs"
    :class="clsx(styles.itemGroupLabel, className)"
    data-slot="menu-item-group-label"
  >
    <slot />
  </ArkMenuItemGroupLabel>
</template>