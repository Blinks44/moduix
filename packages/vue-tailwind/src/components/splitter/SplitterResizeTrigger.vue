<script setup lang="ts">
import { SplitterResizeTrigger as ArkSplitterResizeTrigger } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter';
import { useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import SplitterResizeTriggerIndicator from './SplitterResizeTriggerIndicator.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterResizeTriggerProps {
  asChild?: SplitterResizeTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
  id: SplitterResizeTriggerProps['id'];
}

const { asChild = false, class: className, id } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
const triggerClass =
  "group/trigger relative z-1 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-200 ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-border before:transition-[background-color] before:duration-200 before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-2.5 after:content-[''] data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:min-h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full motion-reduce:transition-none motion-reduce:before:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40";
</script>

<template>
  <ArkSplitterResizeTrigger
    v-bind="attrs"
    :as-child="asChild"
    :id="id"
    :class="cn(triggerClass, className)"
    data-slot="splitter-resize-trigger"
  >
    <SplitterResizeTriggerIndicator v-if="!asChild && !slots.default" />
    <slot v-else />
  </ArkSplitterResizeTrigger>
</template>