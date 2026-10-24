<script setup lang="ts">
import { DrawerRoot as ArkDrawerRoot } from '@ark-ui/vue/drawer';
import type {
  DrawerOpenChangeDetails,
  DrawerRootProps,
  DrawerSnapPointChangeDetails,
  DrawerTriggerValueChangeDetails,
} from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerRootProps {
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
}

export interface Emits {
  exitComplete: [];
  openChange: [details: DrawerOpenChangeDetails];
  'update:open': [open: boolean];
  snapPointChange: [details: DrawerSnapPointChangeDetails];
  'update:snapPoint': [snapPoint: number | string | null];
  triggerValueChange: [details: DrawerTriggerValueChangeDetails];
  'update:triggerValue': [triggerValue: string | null];
}

const {
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkDrawerRoot v-bind="attrs" :lazy-mount="lazyMount" :unmount-on-exit="unmountOnExit">
      <slot />
    </ArkDrawerRoot>
  </OverlayPortalProvider>
</template>