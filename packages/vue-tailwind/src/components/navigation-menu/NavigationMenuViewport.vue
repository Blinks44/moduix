<script setup lang="ts">
import { NavigationMenuViewport as ArkNavigationMenuViewport } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuViewportProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const viewportClass =
  'relative mt-2.5 box-border h-[var(--viewport-height)] max-h-[min(32rem,calc(100dvh-1.5rem))] w-[var(--viewport-width)] max-w-[min(40rem,calc(100vw-1.5rem))] origin-top overflow-hidden rounded-md bg-popover text-popover-foreground shadow-lg outline-1 outline-border transition-[inline-size,block-size] duration-200 ease-in-out data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none motion-reduce:transition-none [&_[data-slot=navigation-menu-content]]:absolute [&_[data-slot=navigation-menu-content]]:top-0 [&_[data-slot=navigation-menu-content]]:right-auto [&_[data-slot=navigation-menu-content]]:bottom-auto [&_[data-slot=navigation-menu-content]]:left-0 [&_[data-slot=navigation-menu-content]]:m-0 [&_[data-slot=navigation-menu-content]]:max-h-none [&_[data-slot=navigation-menu-content]]:origin-center [&_[data-slot=navigation-menu-content]]:overflow-visible [&_[data-slot=navigation-menu-content]]:rounded-none [&_[data-slot=navigation-menu-content]]:bg-transparent [&_[data-slot=navigation-menu-content]]:shadow-none [&_[data-slot=navigation-menu-content]]:outline-0 [&_[data-slot=navigation-menu-content]]:will-change-[translate,opacity] [&_[data-slot=navigation-menu-content][data-motion=from-end][data-state=open]]:animate-moduix-navigation-menu-content-from-end [&_[data-slot=navigation-menu-content][data-motion=from-start][data-state=open]]:animate-moduix-navigation-menu-content-from-start [&_[data-slot=navigation-menu-content][data-motion=to-end][data-state=closed]]:animate-moduix-navigation-menu-content-to-end [&_[data-slot=navigation-menu-content][data-motion=to-start][data-state=closed]]:animate-moduix-navigation-menu-content-to-start [&_[data-slot=navigation-menu-content][data-state]]:animate-none';
</script>

<template>
  <ArkNavigationMenuViewport
    v-bind="attrs"
    :class="cn(viewportClass, className)"
    data-slot="navigation-menu-viewport"
  >
    <slot />
  </ArkNavigationMenuViewport>
</template>