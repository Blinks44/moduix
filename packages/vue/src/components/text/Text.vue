<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import styles from './Text.module.css';

export type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextTone = 'default' | 'muted' | 'primary' | 'destructive';
export type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

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
const clamp = computed(() =>
  Number.isInteger(lineClamp) && (lineClamp ?? 0) > 0 ? lineClamp : undefined,
);
</script>

<template>
  <component
    :is="ark[as]"
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :style="clamp === undefined ? style : [style, { '-webkit-line-clamp': clamp }]"
    data-scope="text"
    data-part="root"
    data-slot="text-root"
    :data-size="size ?? (as === 'small' ? 'sm' : 'md')"
    :data-weight="weight ?? (as === 'strong' ? 'semibold' : 'regular')"
    :data-tone="tone"
    :data-align="align"
    :data-truncate="truncate ? '' : undefined"
    :data-line-clamp="clamp === undefined ? undefined : ''"
  >
    <slot />
  </component>
</template>