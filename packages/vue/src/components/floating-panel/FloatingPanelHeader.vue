<script setup lang="ts">
import { FloatingPanelHeader as ArkFloatingPanelHeader } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelHeaderProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelHeaderProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelHeader
    v-bind="attrs"
    :class="clsx(styles.header, className)"
    data-slot="floating-panel-header"
  >
    <slot />
  </ArkFloatingPanelHeader>
</template>