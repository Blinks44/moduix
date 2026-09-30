<script setup lang="ts">
import { SplitterResizeTrigger as ArkSplitterResizeTrigger } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter';
import { computed, useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import SplitterResizeTriggerIndicator from '../splitter/SplitterResizeTriggerIndicator.vue';
import { useSidebarConfig } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<SplitterResizeTriggerProps, 'id'> {
  asChild?: SplitterResizeTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}
const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const slots = useSlots();
const { panelId, side } = useSidebarConfig();
const resizeTriggerId = computed<`${string}:${string}`>(() =>
  side.value === 'left' ? `${panelId.value}:content` : `content:${panelId.value}`,
);
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : 'Resize sidebar',
);
const resizeTriggerClass =
  "group/trigger relative z-1 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-200 ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-border before:transition-[background-color] before:duration-200 before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-2.5 after:content-[''] data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground/40 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40";
</script>

<template>
  <ArkSplitterResizeTrigger
    v-bind="attrs"
    :as-child="asChild"
    :id="resizeTriggerId"
    :aria-label="ariaLabel"
    :class="cn(resizeTriggerClass, 'z-2', className)"
    :data-side="side"
    data-slot="sidebar-resize-trigger"
  >
    <SplitterResizeTriggerIndicator v-if="!asChild && !slots.default" />
    <slot v-else />
  </ArkSplitterResizeTrigger>
</template>