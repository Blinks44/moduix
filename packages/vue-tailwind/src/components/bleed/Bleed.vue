<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedAmount | 'full';

const bleedVariants = cva('', {
  variants: {
    inline: {
      none: null,
      xs: '-mx-1',
      sm: '-mx-2',
      md: '-mx-3',
      lg: '-mx-4',
      xl: '-mx-6',
      full: 'mx-[calc(50%_-_50vi)] [inline-size:100vi]',
    },
    block: {
      none: null,
      xs: '-my-1',
      sm: '-my-2',
      md: '-my-3',
      lg: '-my-4',
      xl: '-my-6',
    },
  },
  defaultVariants: {
    inline: 'full',
    block: 'none',
  },
});

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  block?: BleedAmount;
  class?: HTMLAttributes['class'];
  inline?: BleedInline;
}

const { block = 'none', class: className, inline = 'full' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn(bleedVariants({ inline, block }), className)"
    data-scope="bleed"
    data-part="root"
    data-slot="bleed-root"
    :data-inline="inline"
    :data-block="block"
  >
    <slot />
  </ark.div>
</template>