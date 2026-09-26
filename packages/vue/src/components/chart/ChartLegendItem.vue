<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import styles from './Chart.module.css';

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
    :class="clsx(styles.legendItem, className)"
    :style="legendItemStyle"
    data-scope="chart"
    data-part="legend-item"
    data-slot="chart-legend-item"
  >
    <slot />
  </ark.li>
</template>