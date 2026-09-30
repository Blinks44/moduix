<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { useAttrs } from 'vue';
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
const { side } = useSidebarConfig();
</script>

<template>
  <ArkSplitterPanel
    v-bind="attrs"
    :as-child="asChild"
    id="content"
    :class="
      cn(
        'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none data-dragging:select-none',
        'relative min-w-0 overflow-auto bg-background p-0 text-foreground',
        className,
      )
    "
    :data-side="side"
    data-slot="sidebar-inset"
  >
    <slot />
  </ArkSplitterPanel>
</template>