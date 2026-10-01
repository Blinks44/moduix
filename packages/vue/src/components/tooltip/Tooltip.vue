<script setup lang="ts">
import { TooltipRoot as ArkTooltipRoot } from '@ark-ui/vue/tooltip';
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipRootProps {
  lazyMount?: TooltipRootProps['lazyMount'];
  portalRef?: PortalRef;
  portalled?: boolean;
  unmountOnExit?: TooltipRootProps['unmountOnExit'];
}

export interface Emits extends /* @vue-ignore */ TooltipRootEmits {}

const {
  lazyMount = true,
  portalRef,
  portalled = true,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkTooltipRoot v-bind="attrs" :lazy-mount="lazyMount" :unmount-on-exit="unmountOnExit">
      <slot />
    </ArkTooltipRoot>
  </OverlayPortalProvider>
</template>