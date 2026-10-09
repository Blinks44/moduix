<script setup lang="ts">
import { FloatingPanelControl as ArkFloatingPanelControl } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelControlProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="floating-panel-control"
  >
    <slot />
  </ArkFloatingPanelControl>
</template>