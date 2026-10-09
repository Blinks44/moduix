<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md';

const tagVariants = cva(
  'inline-flex min-h-control-xs w-fit max-w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-0.5 align-middle font-medium text-xs whitespace-nowrap transition-colors duration-200 ease-in-out motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border bg-transparent text-foreground',
        ghost: 'border-transparent bg-transparent text-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'min-h-5 gap-1 px-1.5 py-0',
        md: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  size?: TagSize;
  variant?: TagVariant;
}

const {
  asChild = false,
  class: className,
  size = 'md',
  variant = 'default',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :as-child="asChild"
    data-scope="tag"
    data-part="root"
    data-slot="tag-root"
    :data-size="size"
    :data-variant="variant"
    :class="cn(tagVariants({ size, variant }), className)"
  >
    <slot />
  </ark.span>
</template>