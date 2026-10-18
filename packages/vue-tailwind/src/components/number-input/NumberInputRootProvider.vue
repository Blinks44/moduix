<script setup lang="ts">
import { NumberInputRootProvider as ArkNumberInputRootProvider } from '@ark-ui/vue/number-input';
import type { NumberInputRootProviderProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { NumberInputSize } from './NumberInput.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: NumberInputSize;
  value: NumberInputRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/number-input flex flex-col items-start gap-1 data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
        className,
      )
    "
    :data-size="size"
    :value="value"
    data-slot="number-input-root-provider"
  >
    <slot />
  </ArkNumberInputRootProvider>
</template>