<script setup lang="ts">
import { MenuRoot as ArkMenuRoot } from '@ark-ui/vue/menu';
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuRootProps {
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
}
interface Emits extends /* @vue-ignore */ MenuRootEmits {}

const {
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkMenuRoot v-bind="attrs" :lazy-mount="lazyMount" :unmount-on-exit="unmountOnExit">
      <slot />
    </ArkMenuRoot>
  </OverlayPortalProvider>
</template>