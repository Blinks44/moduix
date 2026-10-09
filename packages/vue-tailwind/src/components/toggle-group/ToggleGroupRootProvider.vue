<script setup lang="ts">
import { ToggleGroupRootProvider as ArkToggleGroupRootProvider } from '@ark-ui/vue/toggle-group';
import type { ToggleGroupRootProviderProps as ArkToggleGroupRootProviderProps } from '@ark-ui/vue/toggle-group';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.vue';
import { ToggleGroupStyleContextKey, type ToggleGroupStyleContextValue } from './context';
import { toggleGroupRootVariants } from './ToggleGroup.variants';

defineOptions({ inheritAttrs: false });

export interface ToggleGroupRootProviderProps
  extends /* @vue-ignore */ ArkToggleGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: ToggleSize;
  value: ArkToggleGroupRootProviderProps['value'];
  variant?: ToggleVariant;
}

const {
  class: className,
  size = 'md',
  value,
  variant = 'default',
} = defineProps<ToggleGroupRootProviderProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const styleContext: ToggleGroupStyleContextValue = {
  size: () => size,
  variant: () => variant,
};
provide(ToggleGroupStyleContextKey, styleContext);
</script>

<template>
  <ArkToggleGroupRootProvider
    v-bind="attrs"
    :class="cn(toggleGroupRootVariants({ variant }), className)"
    :data-size="size"
    :data-variant="variant"
    :value="value"
    data-slot="toggle-group-root-provider"
  >
    <slot />
  </ArkToggleGroupRootProvider>
</template>