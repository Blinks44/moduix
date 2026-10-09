<script setup lang="ts">
import { SegmentGroupIndicator as ArkSegmentGroupIndicator } from '@ark-ui/vue/segment-group';
import type { SegmentGroupIndicatorProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="segment-group-indicator"
  >
    <slot />
  </ArkSegmentGroupIndicator>
</template>