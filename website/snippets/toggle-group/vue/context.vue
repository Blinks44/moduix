<script setup lang="ts">
import { ToggleGroup } from '@moduix/vue/toggle-group';
import AlignmentItem from './AlignmentItem.vue';
</script>

<template>
  <ToggleGroup :default-value="['left']" aria-label="Text alignment">
    <AlignmentItem value="left">Left</AlignmentItem>
    <AlignmentItem value="center">Center</AlignmentItem>
    <AlignmentItem value="right">Right</AlignmentItem>
  </ToggleGroup>
</template>