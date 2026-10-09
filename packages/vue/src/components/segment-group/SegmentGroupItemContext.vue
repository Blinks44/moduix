<script setup lang="ts">
import {
  SegmentGroupItemContext as ArkSegmentGroupItemContext,
  type UseSegmentGroupItemContext,
} from '@ark-ui/vue/segment-group';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseSegmentGroupItemContext>) => unknown }>();
</script>

<template>
  <ArkSegmentGroupItemContext v-slot="context">
    <slot v-bind="context" />
  </ArkSegmentGroupItemContext>
</template>