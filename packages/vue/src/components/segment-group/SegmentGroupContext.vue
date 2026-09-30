<script setup lang="ts">
import {
  SegmentGroupContext as ArkSegmentGroupContext,
  type UseSegmentGroupContext,
} from '@ark-ui/vue/segment-group';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseSegmentGroupContext>) => unknown }>();
</script>

<template>
  <ArkSegmentGroupContext v-slot="context">
    <slot v-bind="context" />
  </ArkSegmentGroupContext>
</template>