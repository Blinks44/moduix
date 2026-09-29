<script setup lang="ts">
import { ProgressRange as ArkProgressRange } from '@ark-ui/vue/progress';
import type { ProgressRangeProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressLinear.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressRangeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressRange
    v-bind="attrs"
    :class="clsx(styles.range, className)"
    data-slot="progress-linear-range"
  >
    <slot />
  </ArkProgressRange>
</template>