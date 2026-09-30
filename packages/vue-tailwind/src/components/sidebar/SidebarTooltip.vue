<script setup lang="ts">
import {
  TooltipContent as ArkTooltipContent,
  TooltipPositioner as ArkTooltipPositioner,
  TooltipRoot as ArkTooltipRoot,
  TooltipTrigger as ArkTooltipTrigger,
} from '@ark-ui/vue/tooltip';
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/internal/overlayPortal/context';
import OverlayPortal from '@/internal/overlayPortal/OverlayPortal.vue';
import OverlayPortalProvider from '@/internal/overlayPortal/OverlayPortalProvider.vue';
import { useSidebar } from './context';

defineOptions({ inheritAttrs: false });
export interface Props
  extends /* @vue-ignore */ Omit<TooltipRootProps, 'disabled' | 'positioning'> {
  class?: HTMLAttributes['class'];
  closeDelay?: TooltipRootProps['closeDelay'];
  content?: string | number;
  lazyMount?: TooltipRootProps['lazyMount'];
  openDelay?: TooltipRootProps['openDelay'];
  positioning?: TooltipRootProps['positioning'];
  portalRef?: PortalRef;
  portalled?: boolean;
  unmountOnExit?: TooltipRootProps['unmountOnExit'];
}
export interface Emits extends /* @vue-ignore */ TooltipRootEmits {}
const {
  closeDelay = 0,
  content,
  lazyMount = true,
  openDelay = 200,
  positioning: positioningProp,
  portalRef,
  portalled = true,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown; content?: () => unknown }>();
const attrs = useAttrs();
const { collapsed, side } = useSidebar();
const positioning = computed<TooltipRootProps['positioning']>(() => ({
  placement: side.value === 'left' ? 'right' : 'left',
  gutter: 8,
  ...positioningProp,
}));
const positionerClass =
  'z-[var(--z-index,var(--moduix-z-popup))] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0';
const contentClass =
  'relative z-60 max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(20rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-md border border-border bg-popover px-2 py-1 text-center text-sm leading-5 wrap-anywhere text-popover-foreground shadow-md data-instant:animate-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none';
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkTooltipRoot
      v-bind="attrs"
      :close-delay="closeDelay"
      :lazy-mount="lazyMount"
      :open-delay="openDelay"
      :unmount-on-exit="unmountOnExit"
      :disabled="!collapsed"
      :positioning="positioning"
    >
      <ArkTooltipTrigger as-child data-slot="tooltip-trigger"><slot /></ArkTooltipTrigger>
      <OverlayPortal>
        <ArkTooltipPositioner :class="positionerClass" data-slot="tooltip-positioner">
          <ArkTooltipContent :class="contentClass" data-slot="tooltip-content">
            <slot name="content">{{ content }}</slot>
          </ArkTooltipContent>
        </ArkTooltipPositioner>
      </OverlayPortal>
    </ArkTooltipRoot>
  </OverlayPortalProvider>
</template>