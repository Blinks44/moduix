<script setup lang="ts">
import { SplitterRootProvider as ArkSplitterRootProvider, useSplitter } from '@ark-ui/vue/splitter';
import type {
  SplitterExpandCollapseDetails,
  SplitterPanelData,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
  SplitterRootProps,
} from '@ark-ui/vue/splitter';
import { computed, toRef, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { provideSidebarContext, type SidebarSide } from './context';

type SidebarSizes = (number | string)[];

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

const props = withDefaults(defineProps<Props>(), { panelId: 'sidebar', side: 'left' });
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
const rootStyleValue = computed<StyleValue>(() => [
  { width: undefined, height: undefined },
  props.style,
]);
const rootClass = cn(
  'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize',
  'isolate h-dvh min-h-96 w-full min-w-0 rounded-none border border-border bg-background text-foreground shadow-none',
);
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
    :class="cn(rootClass, props.class)"
    :style="rootStyleValue"
    :data-side="side"
    data-slot="sidebar-root"
  >
    <slot />
  </ArkSplitterRootProvider>
</template>