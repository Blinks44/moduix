<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { Drawer, DrawerPanel } from '../drawer';
import { useSidebar, useSidebarConfig } from './context';

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
      <DrawerPanel size="sm" class="p-0">
        <ark.div
          v-bind="attrs"
          :class="
            cn(
              'group/sidebar-panel @container/sidebar-panel relative flex size-full min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground',
              className,
            )
          "
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
    :class="
      cn(
        'group/sidebar-panel @container/sidebar-panel relative flex min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground data-dragging:select-none',
        className,
      )
    "
    :data-side="side"
    :data-state="state"
    data-slot="sidebar-panel"
  >
    <slot />
  </ArkSplitterPanel>
</template>