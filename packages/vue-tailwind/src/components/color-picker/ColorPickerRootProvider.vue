<script setup lang="ts">
import { ColorPickerRootProvider as ArkColorPickerRootProvider } from '@ark-ui/vue/color-picker';
import type {
  ColorPickerRootProviderEmits,
  ColorPickerRootProviderProps,
} from '@ark-ui/vue/color-picker';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { OverlayPortalContextKey, type PortalRef } from '@/lib/moduix/overlayPortal/context';

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
    :class="
      cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    :value="value"
    data-slot="color-picker-root-provider"
  >
    <slot />
  </ArkColorPickerRootProvider>
</template>