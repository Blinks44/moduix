<script setup lang="ts">
import { SplitterResizeTrigger as ArkSplitterResizeTrigger } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter';
import { useAttrs } from 'vue';
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
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  "group/trigger relative z-1 box-border flex w-px appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 before:absolute before:h-full before:w-[0.5px] before:bg-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:h-full after:w-2.5 after:content-[''] hover:before:bg-muted-foreground/40 data-disabled:opacity-disabled data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-2 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring";
</script>

<template>
  <ArkSplitterResizeTrigger
    :type="asChild ? undefined : 'button'"
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