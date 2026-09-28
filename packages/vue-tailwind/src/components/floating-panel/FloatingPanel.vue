<script setup lang="ts">
import { FloatingPanelRoot as ArkFloatingPanelRoot } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelRootEmits, FloatingPanelRootProps } from '@ark-ui/vue/floating-panel';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { OverlayPortalContextKey, type PortalRef } from '@/lib/moduix/overlayPortal/context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelRootProps {
  class?: HTMLAttributes['class'];
  closeOnEscape?: FloatingPanelRootProps['closeOnEscape'];
  lazyMount?: FloatingPanelRootProps['lazyMount'];
  persistRect?: FloatingPanelRootProps['persistRect'];
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: FloatingPanelRootProps['unmountOnExit'];
}

export interface Emits extends /* @vue-ignore */ FloatingPanelRootEmits {}

const {
  closeOnEscape = true,
  lazyMount = true,
  persistRect = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
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
  <ArkFloatingPanelRoot
    v-bind="attrs"
    :close-on-escape="closeOnEscape"
    :lazy-mount="lazyMount"
    :persist-rect="persistRect"
    :unmount-on-exit="unmountOnExit"
  >
    <slot />
  </ArkFloatingPanelRoot>
</template>