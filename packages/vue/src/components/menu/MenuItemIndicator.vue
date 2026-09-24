<script setup lang="ts">
import { MenuItemIndicator as ArkMenuItemIndicator } from '@ark-ui/vue/menu';
import type { MenuItemIndicatorProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/internal/icons/ui/Icons';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItemIndicator
    v-bind="attrs"
    :class="clsx(styles.itemIndicator, className)"
    data-slot="menu-item-indicator"
  >
    <slot><CheckIcon :class="styles.itemIndicatorIcon" /></slot>
  </ArkMenuItemIndicator>
</template>