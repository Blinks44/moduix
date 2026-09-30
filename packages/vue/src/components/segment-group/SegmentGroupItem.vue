<script setup lang="ts">
import { SegmentGroupItem as ArkSegmentGroupItem } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupItemProps {
  class?: HTMLAttributes['class'];
  value: SegmentGroupItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :value="value"
    data-slot="segment-group-item"
  >
    <slot />
  </ArkSegmentGroupItem>
</template>