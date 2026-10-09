<script setup lang="ts">
import { FloatingPanelTrigger as ArkFloatingPanelTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelTriggerProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelTriggerProps {
  asChild?: FloatingPanelTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="floating-panel-trigger"
  >
    <slot />
  </ArkFloatingPanelTrigger>
</template>