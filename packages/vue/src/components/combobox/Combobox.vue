<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxRootEmits, ComboboxRootProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootProps<T> {
  class?: HTMLAttributes['class'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
}

export interface Emits<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootEmits<T> {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ComboboxRoot as ArkComboboxRoot } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { provide, useAttrs } from 'vue';
import { OverlayPortalContextKey } from '@/lib/moduix/overlayPortal/context';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

const {
  class: className,
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
  <ArkComboboxRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    data-slot="combobox-root"
  >
    <slot />
  </ArkComboboxRoot>
</template>