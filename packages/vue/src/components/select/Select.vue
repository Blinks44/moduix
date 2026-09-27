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
import { clsx } from 'clsx';
import { provide, useAttrs } from 'vue';
import { OverlayPortalContextKey } from '@/lib/moduix/overlayPortal/context';
import styles from './Select.module.css';

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
</script>

<template>
  <ArkSelectRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :collection="collection"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    data-slot="select-root"
  >
    <slot />
  </ArkSelectRoot>
</template>