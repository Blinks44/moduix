<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import styles from './Text.module.css';

type TextElement = 'p' | 'span' | 'small' | 'strong' | 'em' | 'div';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

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
    : [style, { '--_text-line-clamp': resolvedLineClamp.value }],
);
</script>

<template>
  <component
    :is="ark[elementName ?? 'p']"
    v-bind="attrs"
    :class="clsx(styles.root, className)"
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