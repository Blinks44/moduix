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

const sidebarPanel = {
  id: 'sidebar',
  minSize: '3rem',
  maxSize: '18rem',
  collapsible: true,
  collapsedSize: '3rem',
} satisfies SplitterPanelData;

const contentPanel = { id: 'content' } satisfies SplitterPanelData;

const defaultPanelsBySide = {
  left: [sidebarPanel, contentPanel],
  right: [contentPanel, sidebarPanel],
} satisfies Record<SidebarSide, SplitterPanelData[]>;

function getDefaultSidebarSize(side: SidebarSide): SidebarSizes {
  if (side === 'left') return ['16rem'];

  const defaultSize: SidebarSizes = [];
  defaultSize[1] = '16rem';
  return defaultSize;
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

const panels = computed(() =>
  defaultPanelsBySide[side.value].map((panel) =>
    panel.id === 'sidebar' ? { ...panel, id: panelId.value } : panel,
  ),
);
const defaultSize = computed<SidebarSizes>(
  () => props.defaultSize ?? getDefaultSidebarSize(side.value),
);
const rootStyleValue = computed<StyleValue>(() => [rootStyle, props.style]);
const splitter = useSplitter(
  computed(() => ({
    ...attrs,
    defaultSize: defaultSize.value,
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
    :style="rootStyleValue"
    :data-side="side"
    data-slot="sidebar-root"
  >
    <slot />
  </ArkSplitterRootProvider>
</template>