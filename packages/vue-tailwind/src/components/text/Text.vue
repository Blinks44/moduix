<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

export type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextTone = 'default' | 'muted' | 'primary' | 'destructive';
export type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

const textVariants = cva('m-0 tracking-normal wrap-anywhere', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      left: 'text-left',
      right: 'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
    lineClamp: {
      true: '[display:-webkit-box] overflow-hidden whitespace-normal [-webkit-box-orient:vertical]',
    },
  },
});

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'p'> {
  as?: TextElement;
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  truncate?: boolean;
  lineClamp?: number;
}

const {
  as = 'p',
  class: className,
  style,
  size,
  weight,
  tone = 'default',
  align,
  truncate = false,
  lineClamp,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedSize = computed(() => size ?? (as === 'small' ? 'sm' : 'md'));
const resolvedWeight = computed(() => weight ?? (as === 'strong' ? 'semibold' : 'regular'));
const clamp = computed(() =>
  Number.isInteger(lineClamp) && (lineClamp ?? 0) > 0 ? lineClamp : undefined,
);
const textClass = computed(() =>
  cn(
    textVariants({
      size: resolvedSize.value,
      weight: resolvedWeight.value,
      tone,
      align,
      truncate,
      lineClamp: clamp.value !== undefined,
    }),
    className,
  ),
);
</script>

<template>
  <component
    :is="ark[as]"
    v-bind="attrs"
    :class="textClass"
    :style="clamp === undefined ? style : [style, { '-webkit-line-clamp': clamp }]"
    data-scope="text"
    data-part="root"
    data-slot="text-root"
    :data-size="resolvedSize"
    :data-weight="resolvedWeight"
    :data-tone="tone"
    :data-align="align"
    :data-truncate="truncate ? '' : undefined"
    :data-line-clamp="clamp === undefined ? undefined : ''"
  >
    <slot />
  </component>
</template>