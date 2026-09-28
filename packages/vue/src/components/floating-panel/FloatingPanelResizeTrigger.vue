<script setup lang="ts">
import { FloatingPanelResizeTrigger as ArkFloatingPanelResizeTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelResizeTriggerProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelResizeTriggerProps {
  axis: FloatingPanelResizeTriggerProps['axis'];
  class?: HTMLAttributes['class'];
}

const { axis, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelResizeTrigger
    v-bind="attrs"
    :axis="axis"
    :class="clsx(styles.resizeTrigger, className)"
    data-slot="floating-panel-resize-trigger"
  >
    <slot />
  </ArkFloatingPanelResizeTrigger>
</template>