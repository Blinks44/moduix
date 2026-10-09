<script setup lang="ts">
import { DateInputSegmentGroup as ArkDateInputSegmentGroup } from '@ark-ui/vue/date-input';
import type { DateInputSegmentGroupProps } from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputSegmentGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputSegmentGroup
    v-bind="attrs"
    :class="clsx(styles.segmentGroup, className)"
    data-slot="date-input-segment-group"
  >
    <slot />
  </ArkDateInputSegmentGroup>
</template>