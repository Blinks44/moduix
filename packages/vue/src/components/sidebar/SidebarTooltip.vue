<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '../tooltip';
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
</script>

<template>
  <Tooltip
    v-bind="attrs"
    :portalled="portalled"
    :portal-ref="portalRef"
    :close-delay="closeDelay"
    :lazy-mount="lazyMount"
    :open-delay="openDelay"
    :unmount-on-exit="unmountOnExit"
    :disabled="!collapsed"
    :positioning="positioning"
  >
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent>
        <slot name="content">{{ content }}</slot>
      </TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</template>