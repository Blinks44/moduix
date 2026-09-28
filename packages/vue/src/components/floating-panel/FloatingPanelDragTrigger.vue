<script setup lang="ts">
import { FloatingPanelDragTrigger as ArkFloatingPanelDragTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelDragTriggerProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelDragTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelDragTrigger
    v-bind="attrs"
    :class="clsx(styles.dragTrigger, className)"
    data-slot="floating-panel-drag-trigger"
  >
    <slot />
  </ArkFloatingPanelDragTrigger>
</template>