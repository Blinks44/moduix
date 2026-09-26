<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

const badgeVariants = cva(
  'inline-flex min-h-5 w-fit max-w-full min-w-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 align-middle font-medium text-xs tabular-nums whitespace-nowrap no-underline select-none transition-[color,background-color,border-color,opacity] duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-0.5 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [a&]:cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:opacity-90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:opacity-90',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground [a&]:hover:opacity-90',
        outline:
          'border-border bg-transparent text-foreground [a&]:hover:border-primary [a&]:hover:text-primary',
        ghost:
          'border-transparent bg-transparent text-foreground [a&]:hover:border-primary [a&]:hover:text-primary',
        link: 'min-h-auto rounded-none border-transparent bg-transparent px-0 py-[0.125em] text-primary underline decoration-[color-mix(in_oklab,currentColor_55%,transparent)] underline-offset-[0.15em] [text-decoration-thickness:from-font] [a&]:hover:decoration-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  variant?: BadgeVariant;
  class?: HTMLAttributes['class'];
}

const { class: className, variant = 'default' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    data-scope="badge"
    data-part="root"
    data-slot="badge-root"
    :data-variant="variant"
    :class="cn(badgeVariants({ variant }), className)"
  >
    <slot />
  </ark.span>
</template>