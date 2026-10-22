<script setup lang="ts">
import { SplitterRootProvider as ArkSplitterRootProvider, useSplitter } from '@ark-ui/vue/splitter';
import type {
  SplitterExpandCollapseDetails,
  SplitterPanelData,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
  SplitterRootProps,
} from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { computed, toRef, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import splitterStyles from '../splitter/Splitter.module.css';
import { provideSidebarContext, type SidebarSide } from './context';
import styles from './Sidebar.module.css';

type SidebarSizes = (number | string)[];

const rootStyle = {
  width: 'var(--moduix-splitter-width, 100%)',
  height: 'var(--moduix-splitter-height, 28rem)',
};

function getPanels(side: SidebarSide, panelId: string): SplitterPanelData[] {
  const sidebar = {
    id: panelId,
    minSize: '3rem',
    maxSize: '18rem',
    collapsible: true,
    collapsedSize: '3rem',
  };
  const content = { id: 'content' };
  return side === 'left' ? [sidebar, content] : [content, sidebar];
}

function getDefaultSize(side: SidebarSide): SidebarSizes {
  const size: SidebarSizes = [];
  size[side === 'left' ? 0 : 1] = '16rem';
  return size;
}

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<
    SplitterRootProps,
    'defaultSize' | 'orientation' | 'panels' | 'size'
  > {
  class?: HTMLAttributes['class'];
  defaultSize?: SidebarSizes;
  panelId?: string;
  side?: SidebarSide;
  size?: SidebarSizes;
  style?: StyleValue;
}

export interface Emits {
  collapse: [details: SplitterExpandCollapseDetails];
  expand: [details: SplitterExpandCollapseDetails];
  resize: [details: SplitterResizeDetails];
  resizeEnd: [details: SplitterResizeEndDetails];
  resizeStart: [];
  'update:size': [size: SidebarSizes];
}

const props = withDefaults(defineProps<Props>(), {
  panelId: 'sidebar',
  side: 'left',
});
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const panelId = toRef(props, 'panelId');
const side = toRef(props, 'side');

provideSidebarContext({ panelId, side });

const panels = computed(() => getPanels(side.value, panelId.value));
const splitter = useSplitter(
  computed(() => ({
    ...attrs,
    defaultSize: props.defaultSize ?? getDefaultSize(side.value),
    orientation: 'horizontal' as const,
    panels: panels.value,
    size: props.size,
  })),
  emit,
);
</script>

<template>
  <ArkSplitterRootProvider
    v-bind="attrs"
    :value="splitter"
    :class="clsx(splitterStyles.root, styles.root, props.class)"
    :style="[rootStyle, props.style]"
    :data-side="side"
    data-slot="sidebar-root"
  >
    <slot />
  </ArkSplitterRootProvider>
</template>