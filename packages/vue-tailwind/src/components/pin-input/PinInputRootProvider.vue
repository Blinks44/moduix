<script setup lang="ts">
import { PinInputRootProvider as ArkPinInputRootProvider } from '@ark-ui/vue/pin-input';
import type { PinInputRootProviderProps } from '@ark-ui/vue/pin-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { PinInputSize } from './PinInput.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: PinInputSize;
  value: PinInputRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/pin-input inline-flex flex-col items-start gap-2 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
        className,
      )
    "
    :data-size="size"
    :value="value"
    data-slot="pin-input-root-provider"
  >
    <slot />
  </ArkPinInputRootProvider>
</template>