<script setup lang="ts">
import { SwapRootProvider as ArkSwapRootProvider } from '@ark-ui/vue/swap';
import type { SwapRootProviderProps } from '@ark-ui/vue/swap';
import { clsx } from 'clsx';
import { useAttrs, type HTMLAttributes } from 'vue';
import styles from './Swap.module.css';
import type { SwapAnimation } from './Swap.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SwapRootProviderProps {
  animation?: SwapAnimation;
  class?: HTMLAttributes['class'];
  value: SwapRootProviderProps['value'];
}

const { animation = 'scale', class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwapRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-animation="animation"
    :value="value"
    data-slot="swap-root-provider"
  >
    <slot />
  </ArkSwapRootProvider>
</template>