<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Splitter.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterPanelProps {
  class?: HTMLAttributes['class'];
  id: SplitterPanelProps['id'];
}

const { class: className, id } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSplitterPanel
    v-bind="attrs"
    :id="id"
    :class="clsx(styles.panel, className)"
    data-slot="splitter-panel"
  >
    <slot />
  </ArkSplitterPanel>
</template>