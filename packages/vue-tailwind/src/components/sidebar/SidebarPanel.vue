<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { useSidebar, useSidebarConfig } from './context';

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