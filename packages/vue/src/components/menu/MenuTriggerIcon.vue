<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <span v-bind="attrs" :class="clsx(styles.triggerIcon, className)" data-slot="menu-trigger-icon">
    <slot><ChevronDownIcon :class="styles.iconSvg" /></slot>
  </span>
</template>