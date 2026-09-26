<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type CardSize = 'sm' | 'md' | 'lg';
type CardVariant = 'elevated' | 'outline' | 'subtle';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  size?: CardSize;
  variant?: CardVariant;
}

const cardRootVariants = cva(
  'group/card relative flex w-full min-w-0 flex-col rounded-lg text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring has-[>[data-slot=card-background]]:isolate [&:has(>[data-slot=card-background])>*:not([data-slot=card-background])]:z-1 [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,summary,audio[controls],video[controls],iframe,[contenteditable=true],[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:relative [&:has([data-slot=card-link])_:is(a,button,input,select,textarea,summary,audio[controls],video[controls],iframe,[contenteditable=true],[role=button],[role=checkbox],[role=menuitem],[role=switch],[tabindex]:not([tabindex=-1])):not([data-slot=card-link])]:z-1',
  {
    variants: {
      variant: {
        elevated: 'border-0 bg-card shadow-md',
        outline: 'border border-border bg-card',
        subtle: 'border-0 bg-muted',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

const { class: className, size = 'md', variant = 'outline' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn(cardRootVariants({ variant }), className)"
    data-scope="card"
    data-part="root"
    :data-size="size"
    :data-variant="variant"
    data-slot="card-root"
  >
    <slot />
  </ark.div>
</template>