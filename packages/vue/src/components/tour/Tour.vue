<script setup lang="ts">
import { TourRoot as ArkTourRoot } from '@ark-ui/vue/tour';
import type { TourRootEmits, TourRootProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourRootProps {
  lazyMount?: TourRootProps['lazyMount'];
  portalRef?: PortalRef;
  portalled?: boolean;
  tour: TourRootProps['tour'];
  unmountOnExit?: TourRootProps['unmountOnExit'];
}

export interface Emits extends /* @vue-ignore */ TourRootEmits {}

const {
  lazyMount = true,
  portalRef,
  portalled = true,
  tour,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkTourRoot
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :tour="tour"
      :unmount-on-exit="unmountOnExit"
    >
      <slot />
    </ArkTourRoot>
  </OverlayPortalProvider>
</template>