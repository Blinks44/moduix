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
  'absolute z-60 flex data-[orientation=horizontal]:top-full data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:[translate:var(--viewport-x,0px)_0] data-[orientation=vertical]:start-full data-[orientation=vertical]:top-[var(--viewport-y,0px)]';
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