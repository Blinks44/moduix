<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

const elements = {
  div: ark.div,
  em: ark.em,
  p: ark.p,
  small: ark.small,
  span: ark.span,
  strong: ark.strong,
} as const;

const textVariants = cva('tracking-normal wrap-anywhere', {
  variants: {
    size: { xs: 'text-xs', sm: 'text-sm', md: 'text-md', lg: 'text-lg', xl: 'text-xl' },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-secondary-foreground',
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
  as: elementName,
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
const element = computed(() => elements[elementName ?? 'p']);
const resolvedSize = computed(() => size ?? (elementName === 'small' ? 'sm' : 'md'));
const resolvedWeight = computed(
  () => weight ?? (elementName === 'strong' ? 'semibold' : 'regular'),
);
const resolvedLineClamp = computed(() =>
  Number.isInteger(lineClamp) && (lineClamp ?? 0) > 0 ? lineClamp : undefined,
);
const textStyle = computed<StyleValue>(() =>
  resolvedLineClamp.value === undefined
    ? style
    : [style, { '-webkit-line-clamp': resolvedLineClamp.value }],
);
const textClass = computed(() =>
  cn(
    textVariants({
      size: resolvedSize.value,
      weight: resolvedWeight.value,
      tone,
      align: align ?? 'start',
    }),
    truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
    resolvedLineClamp.value !== undefined &&
      '[display:-webkit-box] overflow-hidden whitespace-normal [-webkit-box-orient:vertical]',
    className,
  ),
);
</script>

<template>
  <component
    :is="element"
    v-bind="attrs"
    :class="textClass"
    :style="textStyle"
    data-scope="text"
    data-part="root"
    data-slot="text-root"
    :data-size="resolvedSize"
    :data-weight="resolvedWeight"
    :data-tone="tone"
    :data-align="align"
    :data-truncate="truncate ? '' : undefined"
    :data-line-clamp="resolvedLineClamp === undefined ? undefined : ''"
  >
    <slot />
  </component>
</template>