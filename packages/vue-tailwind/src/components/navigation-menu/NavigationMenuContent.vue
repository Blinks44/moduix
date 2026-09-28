<script setup lang="ts">
import { NavigationMenuContent as ArkNavigationMenuContent } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuContentProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const contentClass =
  'group/navigation-menu-content absolute start-0 top-[calc(100%+0.5rem)] z-60 box-border flex max-h-[min(24rem,calc(100dvh-1.5rem))] w-max max-w-[min(20rem,calc(100vw-1.5rem))] min-w-[min(max(var(--trigger-width,0px),12rem),calc(100vw-1.5rem))] origin-top-left flex-col overflow-auto overscroll-contain rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:data-[state=closed]:animate-none data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none rtl:origin-top-right [&_[data-slot=navigation-menu-link]]:mx-1 [&_[data-slot=navigation-menu-link]]:justify-start [&_[data-slot=navigation-menu-link]]:rounded-sm [&_[data-slot=navigation-menu-link]]:px-2';
</script>

<template>
  <ArkNavigationMenuContent
    v-bind="attrs"
    :class="cn(contentClass, className)"
    data-slot="navigation-menu-content"
  >
    <slot />
  </ArkNavigationMenuContent>
</template>