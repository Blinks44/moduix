<script setup lang="ts">
import { NavigationMenuIndicator as ArkNavigationMenuIndicator } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuIndicatorProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const indicatorClass =
  'pointer-events-none absolute start-0 -top-2.5 flex h-2.5 w-[var(--trigger-width,0px)] [translate:var(--trigger-x,0px)_0] justify-center transition-[translate,inline-size] duration-200 ease-in-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none';
</script>

<template>
  <ArkNavigationMenuIndicator
    v-bind="attrs"
    :class="cn(indicatorClass, className)"
    data-slot="navigation-menu-indicator"
  >
    <slot />
  </ArkNavigationMenuIndicator>
</template>