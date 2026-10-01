<script setup lang="ts">
import { ToggleGroupRoot as ArkToggleGroupRoot } from '@ark-ui/vue/toggle-group';
import type {
  ToggleGroupRootEmits,
  ToggleGroupRootProps as ArkToggleGroupRootProps,
} from '@ark-ui/vue/toggle-group';
import { clsx } from 'clsx';
import { provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.vue';
import { ToggleGroupStyleContextKey, type ToggleGroupStyleContextValue } from './context';
import '../toggle/Toggle.module.css';
import styles from './ToggleGroup.module.css';

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
    :class="clsx(styles.root, className)"
    :data-size="size"
    :data-variant="variant"
    data-slot="toggle-group-root"
  >
    <slot />
  </ArkToggleGroupRoot>
</template>