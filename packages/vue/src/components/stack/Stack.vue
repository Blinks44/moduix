<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { CSSProperties, HTMLAttributes, StyleValue } from 'vue';
import styles from './Stack.module.css';

export type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type StackSpacing =
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '4.5'
  | '5'
  | '6'
  | '7'
  | '8'
  | '10';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
  gap?: number | StackSpacing | (string & {});
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

// A spacing step such as `'2'` or `'1.5'` reads `--moduix-spacing-*`, so presets rescale the gap;
// numbers are pixels and other strings are CSS lengths.
function toGap(value: number | string | undefined) {
  if (typeof value === 'number') return `${value}px`;
  return value && /^\d+(\.5)?$/.test(value)
    ? `var(--moduix-spacing-${value.replace('.', '-')})`
    : value;
}

const stackStyle = computed<StyleValue>(() => {
  const responsive = typeof direction === 'string' ? { mobile: direction } : direction;
  return [
    {
      '--_stack-direction': responsive?.mobile,
      '--_stack-direction-desktop': responsive?.desktop,
      gap: toGap(gap),
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
    },
    style,
  ];
});
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.root, fill && styles.fill, className)"
    :style="stackStyle"
    data-scope="stack"
    data-part="root"
    data-slot="stack-root"
  >
    <slot />
  </ark.div>
</template>