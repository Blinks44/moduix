<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'block w-full overflow-hidden rounded-md',
        loading &&
          cn(
            'pointer-events-none h-4 bg-[color-mix(in_oklab,var(--color-muted-foreground)_18%,var(--color-background))] text-transparent select-none before:invisible after:invisible [&_*]:invisible',
            variant === 'none'
              ? 'animate-none'
              : 'animate-[moduix-pulse_2.5s_ease-in-out_infinite]',
            'motion-reduce:animate-none',
          ),
        className,
      )
    "
    :style="skeletonStyle"
  >
    <slot />
  </ark.div>
</template>