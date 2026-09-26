<script setup lang="ts">
import { MenuRootProvider as ArkMenuRootProvider } from '@ark-ui/vue/menu';
import type { MenuRootProviderEmits, MenuRootProviderProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuRootProviderProps {
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: MenuRootProviderProps['value'];
}
interface Emits extends /* @vue-ignore */ MenuRootProviderEmits {}

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
    <ArkMenuRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
    >
      <slot />
    </ArkMenuRootProvider>
  </OverlayPortalProvider>
</template>