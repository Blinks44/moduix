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
  'pointer-events-none absolute -bottom-2.5 left-0 z-61 flex h-2.5 w-[var(--trigger-width,0px)] [translate:var(--trigger-x,0px)_0] justify-center transition-[translate,width] duration-200 ease-in-out data-[state=closed]:animate-[moduix-fade-out_var(--moduix-transition-default)_forwards] data-[state=open]:animate-[moduix-fade-in_var(--moduix-transition-default)] motion-reduce:transition-none motion-reduce:data-[state]:[animation-delay:0ms] motion-reduce:data-[state]:[animation-duration:1ms]';
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