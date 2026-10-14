<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'li'> {
  class?: HTMLAttributes['class'];
  color?: string;
  style?: StyleValue;
}

const { class: className, color, style } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const legendItemStyle = computed<StyleValue | undefined>(() =>
  color ? [{ '--moduix-chart-legend-indicator-color': color }, style] : style,
);
</script>

<template>
  <ark.li
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center gap-2 text-sm text-muted-foreground before:size-2.5 before:shrink-0 before:rounded-full before:bg-(--moduix-chart-legend-indicator-color,--theme(--color-muted-foreground)) before:shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]',
        className,
      )
    "
    :style="legendItemStyle"
    data-scope="chart"
    data-part="legend-item"
    data-slot="chart-legend-item"
  >
    <slot />
  </ark.li>
</template>