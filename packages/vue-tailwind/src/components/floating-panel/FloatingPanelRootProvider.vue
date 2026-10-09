<script setup lang="ts">
import { FloatingPanelRootProvider as ArkFloatingPanelRootProvider } from '@ark-ui/vue/floating-panel';
import type {
  FloatingPanelRootProviderEmits,
  FloatingPanelRootProviderProps,
} from '@ark-ui/vue/floating-panel';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { OverlayPortalContextKey, type PortalRef } from '@/lib/moduix/overlayPortal/context';

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

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelRootProvider
    v-bind="attrs"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    :value="value"
  >
    <slot />
  </ArkFloatingPanelRootProvider>
</template>