<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import splitterStyles from '../splitter/Splitter.module.css';
import { useSidebar, useSidebarConfig } from './context';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SplitterPanelProps, 'id'> {
  asChild?: SplitterPanelProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { panelId } = useSidebarConfig();
const { side, state } = useSidebar();
</script>

<template>
  <ArkSplitterPanel
    v-bind="attrs"
    :as-child="asChild"
    :id="panelId"
    :class="clsx(splitterStyles.panel, styles.panel, className)"
    :data-side="side"
    :data-state="state"
    data-slot="sidebar-panel"
  >
    <slot />
  </ArkSplitterPanel>
</template>