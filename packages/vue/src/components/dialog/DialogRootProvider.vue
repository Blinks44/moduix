<script setup lang="ts">
import { DialogRootProvider as ArkDialogRootProvider } from '@ark-ui/vue/dialog';
import type { DialogRootProviderEmits, DialogRootProviderProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogRootProviderProps {
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: DialogRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ DialogRootProviderEmits {}

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
    <ArkDialogRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
    >
      <slot />
    </ArkDialogRootProvider>
  </OverlayPortalProvider>
</template>