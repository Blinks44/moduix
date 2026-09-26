<script setup lang="ts">
import { ColorPickerRootProvider as ArkColorPickerRootProvider } from '@ark-ui/vue/color-picker';
import type {
  ColorPickerRootProviderEmits,
  ColorPickerRootProviderProps,
} from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { provide } from 'vue';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { OverlayPortalContextKey, type PortalRef } from '@/lib/moduix/overlayPortal/context';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerRootProviderProps {
  class?: HTMLAttributes['class'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: ColorPickerRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ ColorPickerRootProviderEmits {}

const {
  class: className,
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
  value,
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
  <ArkColorPickerRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    :value="value"
    data-slot="color-picker-root-provider"
  >
    <slot />
  </ArkColorPickerRootProvider>
</template>