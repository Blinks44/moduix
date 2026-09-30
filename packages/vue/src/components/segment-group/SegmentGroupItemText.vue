<script setup lang="ts">
import { SegmentGroupItemText as ArkSegmentGroupItemText } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemTextProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupItemText
    v-bind="attrs"
    :class="clsx(styles.itemText, className)"
    data-slot="segment-group-item-text"
  >
    <slot />
  </ArkSegmentGroupItemText>
</template>