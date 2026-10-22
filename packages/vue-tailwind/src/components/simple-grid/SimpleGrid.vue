<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { CSSProperties, HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  columns?: number;
  minChildWidth?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
}

const {
  class: className,
  style,
  columns,
  minChildWidth,
  gap,
  rowGap,
  columnGap,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();

const toCssLength = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

const gridStyle = computed<StyleValue>(() => {
  // Only set what was passed: an empty `rowGap` after `gap` would reset part of the shorthand.
  const layoutStyle: CSSProperties = {};
  if (minChildWidth != null) {
    layoutStyle.gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${toCssLength(minChildWidth)}), 1fr))`;
  } else if (columns != null) {
    layoutStyle.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }
  if (gap != null) layoutStyle.gap = toCssLength(gap);
  if (rowGap != null) layoutStyle.rowGap = toCssLength(rowGap);
  if (columnGap != null) layoutStyle.columnGap = toCssLength(columnGap);

  return [layoutStyle, style];
});
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn('grid grid-cols-1', className)"
    :style="gridStyle"
    data-scope="simple-grid"
    data-part="root"
    data-slot="simple-grid-root"
  >
    <slot />
  </ark.div>
</template>