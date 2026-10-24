<script setup lang="ts">
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue, SVGAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

const railStep = 12;
const railBridge = 6;

// Depths 2 to 4 get their own rail column; deeper headings stay on the last one.
const getRailX = (depth: number) => Math.min(Math.max(depth - 2, 0), 2) * railStep + 0.5;

export interface Props extends /* @vue-ignore */ SVGAttributes {
  class?: HTMLAttributes['class'];
  depth: number;
  nextDepth?: number;
  previousDepth?: number;
  style?: StyleValue;
}

const props = defineProps<Props>();
const attrs = useAttrs();

const x = computed(() => getRailX(props.depth));
const previousX = computed(() => getRailX(props.previousDepth ?? props.depth));
const nextX = computed(() => getRailX(props.nextDepth ?? props.depth));
const hasTurn = computed(() => previousX.value !== x.value);
const railStyle = computed<StyleValue>(() => [
  {
    width: `${Math.max(previousX.value, x.value, nextX.value) + 1.5}px`,
    // Cross the list gap to the next rail, and its bridge too when the line continues.
    height: `calc(100% + ${nextX.value === x.value ? railBridge : 0}px + var(--moduix-spacing-0-5))`,
  },
  props.style,
]);
</script>

<template>
  <svg
    aria-hidden="true"
    v-bind="attrs"
    :class="clsx(styles.rail, props.class)"
    :style="railStyle"
    data-slot="toc-rail"
  >
    <path
      v-if="hasTurn"
      :d="`M ${previousX} 0 C ${previousX} 8 ${x} 4 ${x} ${railBridge * 2}`"
      fill="none"
      vector-effect="non-scaling-stroke"
      stroke="currentColor"
    />
    <line
      :x1="x"
      :y1="hasTurn ? railBridge * 2 : railBridge"
      :x2="x"
      y2="100%"
      vector-effect="non-scaling-stroke"
      stroke="currentColor"
    />
  </svg>
</template>