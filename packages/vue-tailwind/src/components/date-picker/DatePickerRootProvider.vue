<script setup lang="ts">
import { DatePickerRootProvider as ArkDatePickerRootProvider } from '@ark-ui/vue/date-picker';
import type {
  DatePickerRootProviderEmits,
  DatePickerRootProviderProps,
} from '@ark-ui/vue/date-picker';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/internal/overlayPortal/context';
import { OverlayPortalContextKey } from '@/internal/overlayPortal/context';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerRootProviderProps {
  class?: HTMLAttributes['class'];
  lazyMount?: boolean;
  portalled?: boolean;
  portalRef?: PortalRef;
  unmountOnExit?: boolean;
  value: DatePickerRootProviderProps['value'];
}

export interface Emits extends /* @vue-ignore */ DatePickerRootProviderEmits {}

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

const attrs = useAttrs();

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});
</script>

<template>
  <ArkDatePickerRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index=\'1\']]:w-96 data-disabled:opacity-50 data-readonly:opacity-50',
        className,
      )
    "
    :lazy-mount="lazyMount"
    :unmount-on-exit="unmountOnExit"
    :value="value"
    data-slot="date-picker-root-provider"
  >
    <slot />
  </ArkDatePickerRootProvider>
</template>