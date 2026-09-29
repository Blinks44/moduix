<script setup lang="ts">
import { PopoverRootProvider as ArkPopoverRootProvider } from '@ark-ui/vue/popover';
import type { PopoverRootProviderEmits, PopoverRootProviderProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverRootProviderProps {
  lazyMount?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: PopoverRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ PopoverRootProviderEmits {}

const { lazyMount = true, portalRef, unmountOnExit = true, value } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="value.portalled" :portal-ref="portalRef">
    <ArkPopoverRootProvider
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      :value="value"
    >
      <slot />
    </ArkPopoverRootProvider>
  </OverlayPortalProvider>
</template>