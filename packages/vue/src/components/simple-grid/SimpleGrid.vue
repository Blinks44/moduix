<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { CSSProperties, HTMLAttributes, StyleValue } from 'vue';

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
  if (columns != null && (!Number.isInteger(columns) || columns <= 0)) {
    throw new Error('SimpleGrid `columns` must be a finite positive integer.');
  }
  if (typeof minChildWidth === 'number' && (!Number.isFinite(minChildWidth) || minChildWidth < 0)) {
    throw new Error('SimpleGrid `minChildWidth` must be a finite non-negative number.');
  }

  let gridTemplateColumns: string | undefined = 'minmax(0, 1fr)';
  if (columns != null) {
    gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }
  if (minChildWidth != null) {
    gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${toCssLength(minChildWidth)}), 1fr))`;
  }

  const generatedStyle: CSSProperties = {
    display: 'grid',
    ...(gridTemplateColumns == null ? {} : { gridTemplateColumns }),
    ...(gap == null ? {} : { gap: toCssLength(gap) }),
    ...(rowGap == null ? {} : { rowGap: toCssLength(rowGap) }),
    ...(columnGap == null ? {} : { columnGap: toCssLength(columnGap) }),
  };
  return [generatedStyle, style];
});
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="className"
    :style="gridStyle"
    data-scope="simple-grid"
    data-part="root"
    data-slot="simple-grid-root"
  >
    <slot />
  </ark.div>
</template>