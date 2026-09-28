<script setup lang="ts">
import { NavigationMenuViewportPositioner as ArkNavigationMenuViewportPositioner } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuViewportPositionerProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuViewportPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const viewportPositionerClass =
  'absolute start-0 top-full z-60 flex [translate:var(--viewport-x,0px)_0] data-[orientation=vertical]:start-full data-[orientation=vertical]:top-[var(--viewport-y,0px)] data-[orientation=vertical]:[translate:0_0] data-[orientation=vertical]:[&>[data-slot=navigation-menu-viewport]]:ms-2 data-[orientation=vertical]:[&>[data-slot=navigation-menu-viewport]]:mt-0';
</script>

<template>
  <ArkNavigationMenuViewportPositioner
    v-bind="attrs"
    :class="cn(viewportPositionerClass, className)"
    data-slot="navigation-menu-viewport-positioner"
  >
    <slot />
  </ArkNavigationMenuViewportPositioner>
</template>