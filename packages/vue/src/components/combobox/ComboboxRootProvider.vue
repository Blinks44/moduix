<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxRootProviderEmits, ComboboxRootProviderProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ ComboboxRootProviderProps<T> {
  class?: HTMLAttributes['class'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: ComboboxRootProviderProps<T>['value'];
}

export interface Emits extends /* @vue-ignore */ ComboboxRootProviderEmits {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ComboboxRootProvider as ArkComboboxRootProvider } from '@ark-ui/vue/combobox';
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
  value,
} = defineProps<Props<T>>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});
</script>

<template>
  <ArkComboboxRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    :value="value"
    data-slot="combobox-root-provider"
  >
    <slot />
  </ArkComboboxRootProvider>
</template>