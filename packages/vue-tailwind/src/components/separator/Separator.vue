<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

const separatorVariants = cva('block shrink-0 m-0 border-border', {
  variants: {
    orientation: {
      horizontal: 'h-0 w-full',
      vertical: 'h-[1em] w-0',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'border-t-[0.5px]' },
    { orientation: 'horizontal', size: 'sm', class: 'border-t' },
    { orientation: 'horizontal', size: 'md', class: 'border-t-2' },
    { orientation: 'horizontal', size: 'lg', class: 'border-t-[3px]' },
    { orientation: 'vertical', size: 'xs', class: 'border-s-[0.5px]' },
    { orientation: 'vertical', size: 'sm', class: 'border-s' },
    { orientation: 'vertical', size: 'md', class: 'border-s-2' },
    { orientation: 'vertical', size: 'lg', class: 'border-s-[3px]' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  },
});

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
  orientation?: SeparatorOrientation;
  role?: HTMLAttributes['role'];
  size?: SeparatorSize;
  variant?: SeparatorVariant;
}

const {
  class: className,
  orientation = 'horizontal',
  role,
  size = 'sm',
  variant = 'solid',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedRole = computed(() => role ?? 'separator');
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="cn(separatorVariants({ orientation, size, variant }), className)"
    :role="resolvedRole"
    :aria-orientation="resolvedRole === 'separator' ? orientation : undefined"
    data-scope="separator"
    data-part="root"
    data-slot="separator-root"
    :data-orientation="orientation"
    :data-size="size"
    :data-variant="variant"
  >
    <slot />
  </ark.span>
</template>