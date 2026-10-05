<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '../../src/components/toggle-group';
</script>

<template>
  <ToggleGroup :default-value="['left']" aria-label="Alignment">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
  </ToggleGroup>
</template>