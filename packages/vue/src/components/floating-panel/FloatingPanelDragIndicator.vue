<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { GripIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span
    aria-hidden="true"
    v-bind="attrs"
    :class="clsx(styles.dragIndicator, className)"
    data-slot="floating-panel-drag-indicator"
  >
    <slot><GripIcon /></slot>
  </span>
</template>