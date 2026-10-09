<script setup lang="ts">
import { SwapRoot as ArkSwapRoot } from '@ark-ui/vue/swap';
import type { SwapRootProps } from '@ark-ui/vue/swap';
import { useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

export interface Props extends /* @vue-ignore */ SwapRootProps {
  animation?: SwapAnimation;
  class?: HTMLAttributes['class'];
}

const { animation = 'scale', class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  "group/swap place-items-center align-middle [grid-template-areas:'swap'] data-[animation=flip]:[perspective:24rem]";
</script>

<template>
  <ArkSwapRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-animation="animation"
    data-slot="swap-root"
  >
    <slot />
  </ArkSwapRoot>
</template>