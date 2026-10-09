<script setup lang="ts">
import { SwapIndicator as ArkSwapIndicator } from '@ark-ui/vue/swap';
import type { SwapIndicatorProps } from '@ark-ui/vue/swap';
import { clsx } from 'clsx';
import { useAttrs, type HTMLAttributes } from 'vue';
import styles from './Swap.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SwapIndicatorProps {
  class?: HTMLAttributes['class'];
  type: SwapIndicatorProps['type'];
}

const { class: className, type } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwapIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    :type="type"
    data-slot="swap-indicator"
  >
    <slot />
  </ArkSwapIndicator>
</template>