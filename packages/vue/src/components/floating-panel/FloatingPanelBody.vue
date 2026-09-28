<script setup lang="ts">
import { FloatingPanelBody as ArkFloatingPanelBody } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelBodyProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelBodyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelBody
    v-bind="attrs"
    :class="clsx(styles.body, className)"
    data-slot="floating-panel-body"
  >
    <slot />
  </ArkFloatingPanelBody>
</template>