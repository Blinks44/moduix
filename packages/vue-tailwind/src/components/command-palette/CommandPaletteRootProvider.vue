<script setup lang="ts">
import { DialogRootProvider as ArkDialogRootProvider } from '@ark-ui/vue/dialog';
import type { DialogRootProviderEmits, DialogRootProviderProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';

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
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const handleEnterComplete = () => emit('enterComplete');
const handleExitComplete = () => emit('exitComplete');
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkDialogRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
      @enter-complete="handleEnterComplete"
      @exit-complete="handleExitComplete"
    >
      <slot />
    </ArkDialogRootProvider>
  </OverlayPortalProvider>
</template>