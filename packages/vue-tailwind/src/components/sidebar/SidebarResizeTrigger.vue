<script setup lang="ts">
import { SplitterResizeTrigger as ArkSplitterResizeTrigger } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import SplitterResizeTriggerIndicator from '../splitter/SplitterResizeTriggerIndicator.vue';
import { useSidebarConfig } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SplitterResizeTriggerProps, 'id'> {
  asChild?: SplitterResizeTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { panelId, side } = useSidebarConfig();
const resizeTriggerId = computed<`${string}:${string}`>(() =>
  side.value === 'left' ? `${panelId.value}:content` : `content:${panelId.value}`,
);
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : a11yLabels.resizeSidebar,
);

const resizeTriggerClass = [
  "group/trigger relative z-2 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-normal ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-sidebar-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-3 after:content-['']",
  'data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground/40 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-2 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40',
];
</script>

<template>
  <ArkSplitterResizeTrigger
    :type="asChild ? undefined : 'button'"
    v-bind="attrs"
    :as-child="asChild"
    :id="resizeTriggerId"
    :aria-label="ariaLabel"
    :class="cn(resizeTriggerClass, className)"
    :data-side="side"
    data-slot="sidebar-resize-trigger"
  >
    <SplitterResizeTriggerIndicator v-if="!asChild && !slots.default" />
    <slot v-else />
  </ArkSplitterResizeTrigger>
</template>