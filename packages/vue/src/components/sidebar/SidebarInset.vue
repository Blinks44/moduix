<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import splitterStyles from '../splitter/Splitter.module.css';
import { useSidebarConfig } from './context';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SplitterPanelProps, 'id'> {
  asChild?: SplitterPanelProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { side } = useSidebarConfig();
</script>

<template>
  <ArkSplitterPanel
    v-bind="attrs"
    :as-child="asChild"
    id="content"
    :class="clsx(splitterStyles.panel, styles.inset, className)"
    :data-side="side"
    data-slot="sidebar-inset"
  >
    <slot />
  </ArkSplitterPanel>
</template>