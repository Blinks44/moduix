<script setup lang="ts">
import { SwapRootProvider as ArkSwapRootProvider } from '@ark-ui/vue/swap';
import type { SwapRootProviderProps } from '@ark-ui/vue/swap';
import { useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
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
const rootClass =
  "group/swap place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]";
</script>

<template>
  <ArkSwapRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-animation="animation"
    :value="value"
    data-slot="swap-root-provider"
  >
    <slot />
  </ArkSwapRootProvider>
</template>