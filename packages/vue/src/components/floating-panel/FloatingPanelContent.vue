<script setup lang="ts">
import { FloatingPanelContent as ArkFloatingPanelContent } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelContentProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="floating-panel-content"
  >
    <slot />
  </ArkFloatingPanelContent>
</template>