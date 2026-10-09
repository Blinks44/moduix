<script setup lang="ts">
import { SplitterResizeTrigger as ArkSplitterResizeTrigger } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import splitterStyles from '../splitter/Splitter.module.css';
import SplitterResizeTriggerIndicator from '../splitter/SplitterResizeTriggerIndicator.vue';
import { useSidebarConfig } from './context';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SplitterResizeTriggerProps, 'id'> {
  asChild?: SplitterResizeTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { panelId, side } = useSidebarConfig();
const resizeTriggerId = computed<`${string}:${string}`>(() =>
  side.value === 'left' ? `${panelId.value}:content` : `content:${panelId.value}`,
);
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : a11yLabels.resizeSidebar,
);
</script>

<template>
  <ArkSplitterResizeTrigger
    v-bind="attrs"
    :as-child="asChild"
    :id="resizeTriggerId"
    :aria-label="ariaLabel"
    :class="clsx(splitterStyles.resizeTrigger, styles.resizeTrigger, className)"
    :data-side="side"
    data-slot="sidebar-resize-trigger"
  >
    <SplitterResizeTriggerIndicator v-if="!asChild && !slots.default" />
    <slot v-else />
  </ArkSplitterResizeTrigger>
</template>