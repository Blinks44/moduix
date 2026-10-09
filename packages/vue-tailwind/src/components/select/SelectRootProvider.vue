<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { SelectRootProviderEmits, SelectRootProviderProps } from '@ark-ui/vue/select';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ SelectRootProviderProps<T> {
  class?: HTMLAttributes['class'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: SelectRootProviderProps<T>['value'];
}

export interface Emits extends /* @vue-ignore */ SelectRootProviderEmits {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { SelectRootProvider as ArkSelectRootProvider } from '@ark-ui/vue/select';
import { provide, useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { OverlayPortalContextKey } from '@/lib/moduix/overlayPortal/context';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
  value,
} = defineProps<Props<T>>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});

const rootClass = 'flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground';
</script>

<template>
  <ArkSelectRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    :value="value"
    data-slot="select-root-provider"
  >
    <slot />
  </ArkSelectRootProvider>
</template>