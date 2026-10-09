<script setup lang="ts">
import { ScrollAreaViewport as ArkScrollAreaViewport } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaViewportProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const viewportClass =
  'h-full min-h-0 w-full min-w-0 [scrollbar-width:none] rounded-md bg-transparent outline-0 group-data-[fade]/scroll-area:not-forced-colors:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--spacing-10),var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(var(--spacing-10),var(--scroll-area-overflow-y-end,0px))),transparent_100%)] group-data-[fade]/scroll-area:not-forced-colors:mask-no-repeat focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring forced-colors:focus-visible:outline-[Highlight] [&::-webkit-scrollbar]:hidden';
</script>

<template>
  <ArkScrollAreaViewport
    v-bind="attrs"
    :class="cn(viewportClass, className)"
    data-slot="scroll-area-viewport"
  >
    <slot />
  </ArkScrollAreaViewport>
</template>