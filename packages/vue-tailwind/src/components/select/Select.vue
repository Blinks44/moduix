<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { SelectRootEmits, SelectRootProps } from '@ark-ui/vue/select';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ SelectRootProps<T> {
  class?: HTMLAttributes['class'];
  collection: SelectRootProps<T>['collection'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
}

export interface Emits<T extends CollectionItem> extends /* @vue-ignore */ SelectRootEmits<T> {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { SelectRoot as ArkSelectRoot } from '@ark-ui/vue/select';
import { provide, useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { OverlayPortalContextKey } from '@/lib/moduix/overlayPortal/context';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  collection,
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
} = defineProps<Props<T>>();
defineEmits<Emits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});

const rootClass = 'flex w-56 max-w-full min-w-0 flex-col gap-1.5 text-foreground';
</script>

<template>
  <ArkSelectRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :collection="collection"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    data-slot="select-root"
  >
    <slot />
  </ArkSelectRoot>
</template>