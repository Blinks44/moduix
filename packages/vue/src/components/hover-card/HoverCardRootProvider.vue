<script setup lang="ts">
import { HoverCardRootProvider as ArkHoverCardRootProvider } from '@ark-ui/vue/hover-card';
import type {
  HoverCardRootProviderEmits,
  HoverCardRootProviderProps,
} from '@ark-ui/vue/hover-card';
import { useAttrs } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardRootProviderProps {
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: HoverCardRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ HoverCardRootProviderEmits {}

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
    <ArkHoverCardRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
    >
      <slot />
    </ArkHoverCardRootProvider>
  </OverlayPortalProvider>
</template>