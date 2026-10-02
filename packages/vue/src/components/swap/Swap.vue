<script setup lang="ts">
import { SwapRoot as ArkSwapRoot } from '@ark-ui/vue/swap';
import type { SwapRootProps } from '@ark-ui/vue/swap';
import { clsx } from 'clsx';
import { useAttrs, type HTMLAttributes } from 'vue';
import styles from './Swap.module.css';

defineOptions({ inheritAttrs: false });

export type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

export interface Props extends /* @vue-ignore */ SwapRootProps {
  animation?: SwapAnimation;
  class?: HTMLAttributes['class'];
}

const { animation = 'scale', class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwapRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-animation="animation"
    data-slot="swap-root"
  >
    <slot />
  </ArkSwapRoot>
</template>