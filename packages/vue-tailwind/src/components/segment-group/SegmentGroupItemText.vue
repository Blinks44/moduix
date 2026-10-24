<script setup lang="ts">
import { SegmentGroupItemText as ArkSegmentGroupItemText } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemTextProps } from '@ark-ui/vue/segment-group';

export interface Props extends /* @vue-ignore */ SegmentGroupItemTextProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <ArkSegmentGroupItemText data-slot="segment-group-item-text">
    <slot />
  </ArkSegmentGroupItemText>
</template>