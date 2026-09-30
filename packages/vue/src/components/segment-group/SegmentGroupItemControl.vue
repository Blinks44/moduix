<script setup lang="ts">
import { SegmentGroupItemControl as ArkSegmentGroupItemControl } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemControlProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupItemControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupItemControl
    v-bind="attrs"
    :class="clsx(styles.itemControl, className)"
    data-slot="segment-group-item-control"
  >
    <slot />
  </ArkSegmentGroupItemControl>
</template>