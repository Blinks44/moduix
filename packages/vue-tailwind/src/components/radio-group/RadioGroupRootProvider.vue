<script setup lang="ts">
import { RadioGroupRootProvider as ArkRadioGroupRootProvider } from '@ark-ui/vue/radio-group';
import type { RadioGroupRootProviderProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  value: RadioGroupRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupRootProvider
    v-bind="attrs"
    :class="
      cn('relative flex flex-col gap-2 text-foreground data-disabled:cursor-default', className)
    "
    :value="value"
    data-slot="radio-group-root-provider"
  >
    <slot />
  </ArkRadioGroupRootProvider>
</template>