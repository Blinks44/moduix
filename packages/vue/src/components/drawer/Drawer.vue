<script setup lang="ts">
import { DrawerRoot as ArkDrawerRoot } from '@ark-ui/vue/drawer';
import type {
  DrawerOpenChangeDetails,
  DrawerRootProps,
  DrawerSnapPointChangeDetails,
  DrawerTriggerValueChangeDetails,
} from '@ark-ui/vue/drawer';
import { computed, provide, useAttrs } from 'vue';
import type { PortalRef } from '../../internal/overlayPortal/context';
import OverlayPortalProvider from '../../internal/overlayPortal/OverlayPortalProvider.vue';
import { DrawerVariantContextKey, type DrawerVariant } from './context';

defineOptions({ inheritAttrs: false });

type DrawerSnapPoint = number | string;

export interface Props
  extends /* @vue-ignore */ Omit<DrawerRootProps, 'defaultSnapPoint' | 'snapPoint'> {
  defaultSnapPoint?: DrawerSnapPoint | null;
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  snapPoint?: DrawerSnapPoint | null;
  snapPoints?: DrawerRootProps['snapPoints'];
  swipeDirection?: DrawerRootProps['swipeDirection'];
  unmountOnExit?: boolean;
  variant?: DrawerVariant;
}

export interface Emits {
  exitComplete: [];
  openChange: [details: DrawerOpenChangeDetails];
  'update:open': [open: boolean];
  snapPointChange: [details: DrawerSnapPointChangeDetails];
  'update:snapPoint': [snapPoint: DrawerSnapPoint | null];
  triggerValueChange: [details: DrawerTriggerValueChangeDetails];
  'update:triggerValue': [triggerValue: string | null];
}

const {
  defaultSnapPoint,
  lazyMount = true,
  portalled = true,
  portalRef,
  snapPoint,
  snapPoints,
  swipeDirection,
  unmountOnExit = true,
  variant,
} = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

provide(DrawerVariantContextKey, {
  variant: () => variant,
});

const resolvedSnapPoints = computed(() => snapPoints ?? (variant === 'island' ? [1] : undefined));
const resolvedDefaultSnapPoint = computed(() =>
  defaultSnapPoint !== undefined ? defaultSnapPoint : variant === 'island' ? 1 : undefined,
);
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkDrawerRoot
      v-bind="attrs"
      :default-snap-point="resolvedDefaultSnapPoint"
      :lazy-mount="lazyMount"
      :snap-point="snapPoint"
      :snap-points="resolvedSnapPoints"
      :swipe-direction="swipeDirection"
      :unmount-on-exit="unmountOnExit"
    >
      <slot />
    </ArkDrawerRoot>
  </OverlayPortalProvider>
</template>