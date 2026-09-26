<script setup lang="ts">
import { SplitterPanel as ArkSplitterPanel } from '@ark-ui/vue/splitter';
import type { SplitterPanelProps } from '@ark-ui/vue/splitter';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterPanelProps {
  class?: HTMLAttributes['class'];
  id: SplitterPanelProps['id'];
}

const { class: className, id } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const panelClass =
  'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none group-data-[orientation=vertical]/splitter:min-h-0 data-dragging:select-none';
</script>

<template>
  <ArkSplitterPanel
    v-bind="attrs"
    :id="id"
    :class="cn(panelClass, className)"
    data-slot="splitter-panel"
  >
    <slot />
  </ArkSplitterPanel>
</template>