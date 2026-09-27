<script setup lang="ts">
import { DateInputSegment as ArkDateInputSegment } from '@ark-ui/vue/date-input';
import type { DateInputSegmentProps } from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputSegmentProps {
  class?: HTMLAttributes['class'];
  segment: DateInputSegmentProps['segment'];
}

const { class: className, segment } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputSegment
    v-bind="attrs"
    :class="clsx(styles.segment, className)"
    :segment="segment"
    data-slot="date-input-segment"
  />
</template>