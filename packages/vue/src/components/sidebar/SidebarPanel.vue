<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { Drawer, DrawerPanel } from '../drawer';
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
const { isMobile, openMobile, panelId, setOpenMobile } = useSidebarConfig();
const { side, state } = useSidebar();
</script>

<template>
  <template v-if="isMobile">
    <ArkSplitterPanel :id="panelId" hidden :style="{ display: 'none' }" />
    <Drawer
      :open="openMobile"
      :swipe-direction="side === 'right' ? 'end' : 'start'"
      @open-change="({ open }) => setOpenMobile(open)"
    >
      <DrawerPanel size="sm" :style="{ padding: 0 }">
        <ark.div
          v-bind="attrs"
          :class="clsx(styles.panel, className)"
          :style="[{ width: '100%', height: '100%' }, attrs.style as StyleValue]"
          data-mobile=""
          :data-side="side"
          data-state="expanded"
          data-slot="sidebar-panel"
        >
          <slot />
        </ark.div>
      </DrawerPanel>
    </Drawer>
  </template>
  <ArkSplitterPanel
    v-else
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