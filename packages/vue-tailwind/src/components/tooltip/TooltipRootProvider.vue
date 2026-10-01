<script setup lang="ts">
import { TooltipRootProvider as ArkTooltipRootProvider } from '@ark-ui/vue/tooltip';
import type { TooltipRootProviderEmits, TooltipRootProviderProps } from '@ark-ui/vue/tooltip';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipRootProviderProps {
  lazyMount?: TooltipRootProviderProps['lazyMount'];
  portalRef?: PortalRef;
  portalled?: boolean;
  unmountOnExit?: TooltipRootProviderProps['unmountOnExit'];
  value: TooltipRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ TooltipRootProviderEmits {}

const {
  lazyMount = true,
  portalRef,
  portalled = true,
  unmountOnExit = true,
  value,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkTooltipRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
    >
      <slot />
    </ArkTooltipRootProvider>
  </OverlayPortalProvider>
</template>