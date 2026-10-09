<script setup lang="ts">
import { SegmentGroupLabel as ArkSegmentGroupLabel } from '@ark-ui/vue/segment-group';
import type { SegmentGroupLabelProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="segment-group-label"
  >
    <slot />
  </ArkSegmentGroupLabel>
</template>