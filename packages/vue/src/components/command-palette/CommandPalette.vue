<script setup lang="ts">
import { DialogRoot as ArkDialogRoot } from '@ark-ui/vue/dialog';
import type { DialogRootEmits, DialogRootProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';
import CommandPaletteShortcut from './CommandPaletteShortcut.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogRootProps {
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  shortcut?: false | string;
  unmountOnExit?: boolean;
}

export interface Emits extends /* @vue-ignore */ DialogRootEmits {}

const {
  lazyMount = true,
  portalled = true,
  portalRef,
  shortcut = false,
  unmountOnExit = true,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="portalRef">
    <ArkDialogRoot v-bind="attrs" :lazy-mount="lazyMount" :unmount-on-exit="unmountOnExit">
      <CommandPaletteShortcut v-if="shortcut" :shortcut="shortcut" />
      <slot />
    </ArkDialogRoot>
  </OverlayPortalProvider>
</template>