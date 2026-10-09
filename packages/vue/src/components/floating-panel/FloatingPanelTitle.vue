<script setup lang="ts">
import { FloatingPanelTitle as ArkFloatingPanelTitle } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelTitleProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelTitle
    v-bind="attrs"
    :class="clsx(styles.title, className)"
    data-slot="floating-panel-title"
  >
    <slot />
  </ArkFloatingPanelTitle>
</template>