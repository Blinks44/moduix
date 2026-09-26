<script setup lang="ts">
import { ColorPickerRoot as ArkColorPickerRoot } from '@ark-ui/vue/color-picker';
import type { ColorPickerRootEmits, ColorPickerRootProps } from '@ark-ui/vue/color-picker';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { OverlayPortalContextKey, type PortalRef } from '@/lib/moduix/overlayPortal/context';

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
    :class="
      cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    data-slot="color-picker-root"
  >
    <slot />
  </ArkColorPickerRoot>
</template>