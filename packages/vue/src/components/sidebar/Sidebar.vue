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
import { computed, ref, toRef, useAttrs, watchEffect } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import splitterStyles from '../splitter/Splitter.module.css';
import { provideSidebarContext, type SidebarSide } from './context';
import styles from './Sidebar.module.css';

type SidebarSizes = (number | string)[];

const rootStyle = {
  width: 'var(--moduix-sidebar-width, 100%)',
  height: 'var(--moduix-sidebar-height, 100dvh)',
};

function formatBreakpoint(breakpoint: number | string): string {
  return typeof breakpoint === 'number' ? `${breakpoint}px` : breakpoint;
}

function getPanels(
  side: SidebarSide,
  panelId: string,
  options: {
    collapsedSize: number | string;
    collapsible: boolean;
    maxSize: number | string;
    minSize: number | string;
  },
): SplitterPanelData[] {
  const sidebar: SplitterPanelData = {
    id: panelId,
    minSize: options.minSize,
    maxSize: options.maxSize,
    collapsible: options.collapsible,
    ...(options.collapsible ? { collapsedSize: options.collapsedSize } : {}),
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
  collapsedSize?: number | string;
  collapsible?: boolean;
  defaultMobileOpen?: boolean;
  defaultSize?: SidebarSizes;
  maxSize?: number | string;
  minSize?: number | string;
  mobileBreakpoint?: number | string;
  mobileOpen?: boolean;
  panelId?: string;
  side?: SidebarSide;
  size?: SidebarSizes;
  style?: StyleValue;
}

export interface Emits {
  collapse: [details: SplitterExpandCollapseDetails];
  expand: [details: SplitterExpandCollapseDetails];
  mobileOpenChange: [open: boolean];
  resize: [details: SplitterResizeDetails];
  resizeEnd: [details: SplitterResizeEndDetails];
  resizeStart: [];
  'update:mobileOpen': [open: boolean];
  'update:size': [size: SidebarSizes];
}

const props = withDefaults(defineProps<Props>(), {
  collapsedSize: '3rem',
  collapsible: true,
  defaultMobileOpen: false,
  maxSize: '18rem',
  minSize: '3rem',
  mobileOpen: undefined,
  panelId: 'sidebar',
  side: 'left',
});
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const panelId = toRef(props, 'panelId');
const side = toRef(props, 'side');
const isMobile = ref(false);
const uncontrolledMobileOpen = ref(props.defaultMobileOpen);
const openMobile = computed(() => props.mobileOpen ?? uncontrolledMobileOpen.value);

const setOpenMobile = (open: boolean) => {
  if (props.mobileOpen === undefined) {
    uncontrolledMobileOpen.value = open;
  }
  emit('update:mobileOpen', open);
  emit('mobileOpenChange', open);
};

watchEffect((onCleanup) => {
  const bp = props.mobileBreakpoint;
  if (bp == null || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    isMobile.value = false;
    return;
  }
  const query = window.matchMedia(`(max-width: ${formatBreakpoint(bp)})`);
  const sync = () => {
    isMobile.value = query.matches;
  };
  sync();
  query.addEventListener('change', sync);
  onCleanup(() => query.removeEventListener('change', sync));
});

provideSidebarContext({ isMobile, openMobile, panelId, setOpenMobile, side });

const panels = computed(() =>
  getPanels(side.value, panelId.value, {
    collapsedSize: props.collapsedSize,
    collapsible: props.collapsible,
    maxSize: props.maxSize,
    minSize: props.minSize,
  }),
);
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
    :data-mobile="isMobile ? '' : undefined"
    :data-side="side"
    data-slot="sidebar-root"
  >
    <slot />
  </ArkSplitterRootProvider>
</template>