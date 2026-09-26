<script setup lang="ts">
import { SplitterResizeTriggerIndicator as ArkSplitterResizeTriggerIndicator } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerIndicatorProps } from '@ark-ui/vue/splitter';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterResizeTriggerIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const indicatorClass =
  'pointer-events-none absolute start-1/2 top-1/2 z-2 box-border h-control-xs w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 ease-in-out group-hover/trigger:border-muted-foreground/40 group-hover/trigger:shadow-md group-focus-visible/trigger:outline-2 group-focus-visible/trigger:outline-offset-1 group-focus-visible/trigger:outline-ring data-disabled:invisible data-dragging:scale-[1.08] data-dragging:bg-background data-dragging:shadow-md data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-control-xs motion-reduce:transition-none';
</script>

<template>
  <ArkSplitterResizeTriggerIndicator
    v-bind="attrs"
    :class="cn(indicatorClass, className)"
    data-slot="splitter-resize-trigger-indicator"
  >
    <slot />
  </ArkSplitterResizeTriggerIndicator>
</template>