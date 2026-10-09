<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';
</script>

<template>
  <ToggleGroup :default-value="['left']" aria-label="Text alignment">
    <ToggleGroupItem value="left" as-child><button type="button">Left</button></ToggleGroupItem>
    <ToggleGroupItem value="center" as-child><button type="button">Center</button></ToggleGroupItem>
    <ToggleGroupItem value="right" as-child><button type="button">Right</button></ToggleGroupItem>
  </ToggleGroup>
</template>