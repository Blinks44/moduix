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
  "pointer-events-none hidden opacity-0 transition-[opacity,width,height] duration-[var(--moduix-duration-normal),var(--moduix-duration-fast),var(--moduix-duration-fast)] ease-in-out group-data-[variant=always]/scroll-area:pointer-events-auto group-data-[variant=always]/scroll-area:opacity-100 before:absolute before:content-[''] data-hover:pointer-events-auto data-hover:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:mb-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:-inset-y-2 data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:hover:h-1.5 data-[orientation=horizontal]:data-dragging:h-1.5 data-[orientation=horizontal]:data-overflow-x:block data-[orientation=vertical]:my-1 data-[orientation=vertical]:me-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:before:-inset-x-2 data-[orientation=vertical]:hover:w-1.5 data-[orientation=vertical]:data-dragging:w-1.5 data-[orientation=vertical]:data-overflow-y:block";
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