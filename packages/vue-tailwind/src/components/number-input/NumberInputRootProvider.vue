<script setup lang="ts">
import { NumberInputRootProvider as ArkNumberInputRootProvider } from '@ark-ui/vue/number-input';
import type { NumberInputRootProviderProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: NumberInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/number-input flex w-auto max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="number-input-root-provider"
  >
    <slot />
  </ArkNumberInputRootProvider>
</template>