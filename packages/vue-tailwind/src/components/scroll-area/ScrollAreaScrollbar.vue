<script setup lang="ts">
import { ScrollAreaScrollbar as ArkScrollAreaScrollbar } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaScrollbarProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaScrollbarProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const scrollbarClass =
  "pointer-events-none absolute hidden touch-none justify-center rounded-md bg-transparent opacity-0 transition-[opacity,width,height] duration-[200ms,150ms,150ms] ease-in-out select-none group-data-[variant=always]/scroll-area:pointer-events-auto group-data-[variant=always]/scroll-area:opacity-100 before:absolute before:content-[''] data-dragging:pointer-events-auto data-hover:pointer-events-auto data-hover:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:start-0 data-[orientation=horizontal]:end-[var(--corner-width,0px)] data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:mb-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:bottom-1/2 data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:translate-y-1/2 data-[orientation=horizontal]:hover:h-1.5 data-[orientation=horizontal]:data-dragging:h-1.5 data-[orientation=horizontal]:data-overflow-x:flex data-[orientation=vertical]:end-0 data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-[var(--corner-height,0px)] data-[orientation=vertical]:my-1 data-[orientation=vertical]:me-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=vertical]:hover:w-1.5 data-[orientation=vertical]:data-dragging:w-1.5 data-[orientation=vertical]:data-overflow-y:flex motion-reduce:transition-none";
</script>

<template>
  <ArkScrollAreaScrollbar
    v-bind="attrs"
    :class="cn(scrollbarClass, className)"
    data-slot="scroll-area-scrollbar"
  >
    <slot />
  </ArkScrollAreaScrollbar>
</template>