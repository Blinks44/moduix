<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel, useSplitterContext } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { useSidebarConfig } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SplitterPanelProps, 'id'> {
  asChild?: SplitterPanelProps['asChild'];
  class?: HTMLAttributes['class'];
}
const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { panelId, side } = useSidebarConfig();
const splitter = useSplitterContext();
const collapsed = computed(() => splitter.value.isPanelCollapsed(panelId.value));
</script>

<template>
  <ArkSplitterPanel
    v-bind="attrs"
    :as-child="asChild"
    :id="panelId"
    :class="
      cn(
        'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none data-dragging:select-none',
        'group/sidebar-panel @container/sidebar-panel relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-card p-0 text-card-foreground transition-colors duration-200 ease-in-out motion-reduce:transition-none',
        className,
      )
    "
    :data-side="side"
    :data-state="collapsed ? 'collapsed' : 'expanded'"
    data-slot="sidebar-panel"
  >
    <slot />
  </ArkSplitterPanel>
</template>