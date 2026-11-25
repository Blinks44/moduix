<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ComboboxRootEmits, ComboboxRootProps } from '@ark-ui/vue/combobox';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';

export interface Props<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootProps<T> {
  class?: HTMLAttributes['class'];
  filter?: (inputValue: string) => void;
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
}

export interface Emits<T extends CollectionItem> extends /* @vue-ignore */ ComboboxRootEmits<T> {
  inputValueChange: ComboboxRootEmits<T>['inputValueChange'];
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ComboboxRoot as ArkComboboxRoot } from '@ark-ui/vue/combobox';
import { provide, useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { OverlayPortalContextKey } from '@/lib/moduix/overlayPortal/context';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  filter,
  lazyMount = true,
  portalled = true,
  portalRef,
  unmountOnExit = true,
} = defineProps<Props<T>>();
const emit = defineEmits<Emits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

type InputValueChangeDetails = ComboboxRootEmits<T>['inputValueChange'][0];
const handleInputValueChange = (details: InputValueChangeDetails) => {
  filter?.(details.inputValue);
  emit('inputValueChange', details);
};

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});
</script>

<template>
  <ArkComboboxRoot
    v-bind="attrs"
    :class="cn('flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground', className)"
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    @input-value-change="handleInputValueChange"
    data-slot="combobox-root"
  >
    <slot />
  </ArkComboboxRoot>
</template>