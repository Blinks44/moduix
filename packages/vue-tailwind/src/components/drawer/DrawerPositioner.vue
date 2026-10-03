<script setup lang="ts">
import { DrawerPositioner as ArkDrawerPositioner } from '@ark-ui/vue/drawer';
import type { DrawerPositionerProps } from '@ark-ui/vue/drawer';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const positionerClass =
  'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] box-border flex items-end justify-center overflow-hidden overscroll-contain p-0 has-[>[data-slot=drawer-content][data-variant=island]]:pt-[max(var(--moduix-spacing-4),env(safe-area-inset-top,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pr-[max(var(--moduix-spacing-4),env(safe-area-inset-right,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pb-[max(var(--moduix-spacing-4),env(safe-area-inset-bottom,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pl-[max(var(--moduix-spacing-4),env(safe-area-inset-left,0px))] data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start [&:not([hidden])_[data-slot=drawer-content][hidden]]:flex';
</script>

<template>
  <OverlayPortal>
    <ArkDrawerPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="cn(positionerClass, className)"
      data-slot="drawer-positioner"
    >
      <slot />
    </ArkDrawerPositioner>
  </OverlayPortal>
</template>