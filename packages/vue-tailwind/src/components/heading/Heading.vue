<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const defaultSizes: Record<HeadingElement, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
};

const headingVariants = cva('m-0 text-foreground tracking-normal text-balance wrap-anywhere', {
  variants: {
    size: {
      xs: 'text-sm',
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
      '2xl': 'text-3xl',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
});

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'h1'> {
  as?: HeadingElement;
  class?: HTMLAttributes['class'];
  size?: HeadingSize;
  weight?: HeadingWeight;
}

const { as = 'h1', class: className, size, weight = 'semibold' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedSize = computed(() => size ?? defaultSizes[as]);
</script>

<template>
  <component
    :is="ark[as]"
    v-bind="attrs"
    :class="cn(headingVariants({ size: resolvedSize, weight }), className)"
    data-scope="heading"
    data-part="root"
    data-slot="heading-root"
    :data-size="resolvedSize"
    :data-weight="weight"
  >
    <slot />
  </component>
</template>