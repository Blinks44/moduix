<script setup lang="ts">
import { MenuIndicator as ArkMenuIndicator } from '@ark-ui/vue/menu';
import type { MenuIndicatorProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="menu-indicator"
  >
    <slot><ChevronDownIcon :class="styles.iconSvg" /></slot>
  </ArkMenuIndicator>
</template>