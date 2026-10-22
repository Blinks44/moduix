<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { CSSProperties, HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

export type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const stackVariants = cva('flex', {
  variants: {
    mobileDirection: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    desktopDirection: {
      row: 'sm:flex-row',
      'row-reverse': 'sm:flex-row-reverse',
      column: 'sm:flex-col',
      'column-reverse': 'sm:flex-col-reverse',
    },
    fill: {
      true: 'flex-1',
    },
  },
  defaultVariants: {
    mobileDirection: 'column',
  },
});

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
  gap?: number | string;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  fill?: boolean;
}

const {
  class: className,
  style,
  direction,
  gap,
  align,
  justify,
  wrap,
  fill,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();

const stackClass = computed(() => {
  const responsive = typeof direction === 'string' ? { mobile: direction } : direction;
  return cn(
    stackVariants({
      mobileDirection: responsive?.mobile,
      desktopDirection: responsive?.desktop,
      fill,
    }),
    className,
  );
});

const stackStyle = computed<StyleValue>(() => [
  {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
  },
  style,
]);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="stackClass"
    :style="stackStyle"
    data-scope="stack"
    data-part="root"
    data-slot="stack-root"
  >
    <slot />
  </ark.div>
</template>