<script setup lang="ts">
import { ColorPickerRoot as ArkColorPickerRoot } from '@ark-ui/vue/color-picker';
import type { ColorPickerRootEmits, ColorPickerRootProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { provide } from 'vue';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { OverlayPortalContextKey, type PortalRef } from '@/lib/moduix/overlayPortal/context';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerRootProps {
  class?: HTMLAttributes['class'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
}

export interface Emits extends /* @vue-ignore */ ColorPickerRootEmits {}

const {
  class: className,
  lazyMount = true,
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
  <ArkColorPickerRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    data-slot="color-picker-root"
  >
    <slot />
  </ArkColorPickerRoot>
</template>