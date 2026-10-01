<script setup lang="ts">
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue, SVGAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

const railBaseOffset = 0;
const railStep = 12;
const railBridge = 6;
const maxRailLevel = 2;

const getRailOffset = (depth: number) =>
  railBaseOffset + Math.min(Math.max(depth - 2, 0), maxRailLevel) * railStep;

export interface Props extends /* @vue-ignore */ SVGAttributes {
  class?: HTMLAttributes['class'];
  depth: number;
  nextDepth?: number;
  previousDepth?: number;
  style?: StyleValue;
}

const props = defineProps<Props>();
const attrs = useAttrs();

const lineOffset = computed(() => getRailOffset(props.depth));
const previousLineOffset = computed(() => getRailOffset(props.previousDepth ?? props.depth));
const nextLineOffset = computed(() => getRailOffset(props.nextDepth ?? props.depth));
const hasTurn = computed(() => previousLineOffset.value !== lineOffset.value);
const width = computed(
  () => Math.max(previousLineOffset.value, lineOffset.value, nextLineOffset.value) + 2,
);
const height = computed(() =>
  lineOffset.value === nextLineOffset.value
    ? `calc(100% + ${railBridge}px + var(--moduix-table-of-contents-list-gap, var(--moduix-spacing-0-5)))`
    : '100%',
);
const railStyle = computed<StyleValue>(() => [
  { width: `${width.value}px`, height: height.value },
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
      :d="`M ${previousLineOffset + 0.5} 0 C ${previousLineOffset + 0.5} 8 ${lineOffset + 0.5} 4 ${lineOffset + 0.5} ${railBridge * 2}`"
      fill="none"
      vector-effect="non-scaling-stroke"
      stroke="currentColor"
    />
    <line
      :x1="lineOffset + 0.5"
      :y1="hasTurn ? railBridge * 2 : railBridge"
      :x2="lineOffset + 0.5"
      y2="100%"
      vector-effect="non-scaling-stroke"
      stroke="currentColor"
    />
  </svg>
</template>