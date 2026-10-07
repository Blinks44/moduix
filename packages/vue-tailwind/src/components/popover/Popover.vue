<script setup lang="ts">
import { PopoverRoot as ArkPopoverRoot } from '@ark-ui/vue/popover';
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverRootProps {
  lazyMount?: boolean;
  modal?: boolean;
  portalRef?: PortalRef;
  portalled?: boolean;
  unmountOnExit?: boolean;
}

export interface Emits extends /* @vue-ignore */ PopoverRootEmits {}

const {
  lazyMount = true,
  modal = false,
  portalRef,
  portalled = true,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedPortalled = modal || portalled;
</script>

<template>
  <OverlayPortalProvider :portalled="resolvedPortalled" :portal-ref="portalRef">
    <ArkPopoverRoot
      v-bind="attrs"
      :lazy-mount="lazyMount"
      :modal="modal"
      :portalled="resolvedPortalled"
      :unmount-on-exit="unmountOnExit"
    >
      <slot />
    </ArkPopoverRoot>
  </OverlayPortalProvider>
</template>