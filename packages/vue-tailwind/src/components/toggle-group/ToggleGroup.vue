<script setup lang="ts">
import { ToggleGroupRoot as ArkToggleGroupRoot } from '@ark-ui/vue/toggle-group';
import type {
  ToggleGroupRootEmits,
  ToggleGroupRootProps as ArkToggleGroupRootProps,
} from '@ark-ui/vue/toggle-group';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.vue';
import { ToggleGroupStyleContextKey, type ToggleGroupStyleContextValue } from './context';
import { toggleGroupRootVariants } from './ToggleGroup.variants';

defineOptions({ inheritAttrs: false });

export interface ToggleGroupRootProps extends /* @vue-ignore */ ArkToggleGroupRootProps {
  class?: HTMLAttributes['class'];
  size?: ToggleSize;
  variant?: ToggleVariant;
}

export interface Emits extends /* @vue-ignore */ ToggleGroupRootEmits {}

const { class: className, size = 'md', variant = 'default' } = defineProps<ToggleGroupRootProps>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const styleContext: ToggleGroupStyleContextValue = {
  size: () => size,
  variant: () => variant,
};
provide(ToggleGroupStyleContextKey, styleContext);
</script>

<template>
  <ArkToggleGroupRoot
    v-bind="attrs"
    :class="cn(toggleGroupRootVariants({ variant }), className)"
    :data-size="size"
    :data-variant="variant"
    data-slot="toggle-group-root"
  >
    <slot />
  </ArkToggleGroupRoot>
</template>