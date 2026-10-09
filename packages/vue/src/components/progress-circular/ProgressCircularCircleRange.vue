<script setup lang="ts">
import { ProgressCircleRange as ArkProgressCircleRange } from '@ark-ui/vue/progress';
import type { ProgressCircleRangeProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressCircular.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressCircleRangeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressCircleRange
    v-bind="attrs"
    :class="clsx(styles.circleRange, className)"
    data-slot="progress-circular-circle-range"
  >
    <slot />
  </ArkProgressCircleRange>
</template>