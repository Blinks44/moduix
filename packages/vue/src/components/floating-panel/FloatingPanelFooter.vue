<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useFloatingPanelContext } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const floatingPanel = useFloatingPanelContext();
const dataMinimized = computed(
  () => (floatingPanel.value.getContentProps() as { 'data-minimized'?: string })['data-minimized'],
);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.footer, className)"
    :data-minimized="dataMinimized"
    data-slot="floating-panel-footer"
  >
    <slot />
  </ark.div>
</template>