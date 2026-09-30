<script setup lang="ts">
import { TooltipContent as ArkTooltipContent } from '@ark-ui/vue/tooltip';
import { TooltipPositioner as ArkTooltipPositioner } from '@ark-ui/vue/tooltip';
import { TooltipRoot as ArkTooltipRoot } from '@ark-ui/vue/tooltip';
import { TooltipTrigger as ArkTooltipTrigger } from '@ark-ui/vue/tooltip';
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';
import { useSidebar } from './context';
import styles from './Sidebar.module.css';

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
      <ArkTooltipTrigger as-child data-slot="tooltip-trigger">
        <slot />
      </ArkTooltipTrigger>
      <OverlayPortal>
        <ArkTooltipPositioner :class="styles.tooltipPositioner" data-slot="tooltip-positioner">
          <ArkTooltipContent :class="styles.tooltipContent" data-slot="tooltip-content">
            <slot name="content">{{ content }}</slot>
          </ArkTooltipContent>
        </ArkTooltipPositioner>
      </OverlayPortal>
    </ArkTooltipRoot>
  </OverlayPortalProvider>
</template>