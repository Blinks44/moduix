<script setup lang="ts">
import { FloatingPanelRootProvider as ArkFloatingPanelRootProvider } from '@ark-ui/vue/floating-panel';
import type {
  FloatingPanelRootProviderEmits,
  FloatingPanelRootProviderProps,
} from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelRootProviderProps {
  class?: HTMLAttributes['class'];
  lazyMount?: FloatingPanelRootProviderProps['lazyMount'];
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: FloatingPanelRootProviderProps['unmountOnExit'];
  value: FloatingPanelRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ FloatingPanelRootProviderEmits {}

const {
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
  value,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkFloatingPanelRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
    >
      <slot />
    </ArkFloatingPanelRootProvider>
  </OverlayPortalProvider>
</template>