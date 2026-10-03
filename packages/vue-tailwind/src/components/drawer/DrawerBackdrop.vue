<script setup lang="ts">
import { DrawerBackdrop as ArkDrawerBackdrop } from '@ark-ui/vue/drawer';
import type { DrawerBackdropProps } from '@ark-ui/vue/drawer';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerBackdropProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const backdropClass =
  'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] min-h-dvh bg-overlay backdrop-blur-xs [transition:opacity_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_ease-out,backdrop-filter_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_ease-out] data-[state=closed]:animate-moduix-drawer-backdrop-out data-[state=open]:animate-moduix-drawer-backdrop-in data-[state=open]:data-swiping:[transition-duration:0s] motion-reduce:[transition-duration:1ms] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] [&[hidden]:has(~[data-slot=drawer-positioner]:not([hidden]))]:block';
</script>

<template>
  <OverlayPortal>
    <ArkDrawerBackdrop
      :ref="forwardRef"
      v-bind="attrs"
      :class="cn(backdropClass, className)"
      data-slot="drawer-backdrop"
    >
      <slot />
    </ArkDrawerBackdrop>
  </OverlayPortal>
</template>