<script setup lang="ts">
import { MenuTriggerItem as ArkMenuTriggerItem } from '@ark-ui/vue/menu';
import type { MenuTriggerItemProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuTriggerItemProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuTriggerItem
    v-bind="attrs"
    :class="clsx(styles.triggerItem, className)"
    data-slot="menu-trigger-item"
  >
    <slot />
  </ArkMenuTriggerItem>
</template>