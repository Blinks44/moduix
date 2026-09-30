<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import styles from './Skeleton.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  ariaHidden?: HTMLAttributes['aria-hidden'];
  loading?: boolean;
  variant?: 'pulse' | 'none';
  width?: number | string;
  height?: number | string;
  boxSize?: number | string;
  borderRadius?: number | string;
  class?: HTMLAttributes['class'];
  style?: StyleValue;
}

const {
  ariaHidden = undefined,
  loading = true,
  variant = 'pulse',
  width,
  height,
  boxSize,
  borderRadius,
  class: className,
  style,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const toCssValue = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;
const skeletonStyle = computed<StyleValue>(() => [
  {
    width: toCssValue(width ?? boxSize),
    height: toCssValue(height ?? boxSize),
    borderRadius: toCssValue(borderRadius),
  },
  style,
]);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :aria-hidden="ariaHidden ?? (loading ? true : undefined)"
    data-scope="skeleton"
    data-part="root"
    data-slot="skeleton-root"
    :data-state="loading ? 'loading' : 'loaded'"
    :data-loading="loading ? '' : undefined"
    :data-variant="variant"
    :class="clsx(styles.root, className)"
    :style="skeletonStyle"
  >
    <slot />
  </ark.div>
</template>