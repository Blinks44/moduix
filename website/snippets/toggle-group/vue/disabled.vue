<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
    <ToggleGroup :default-value="['one']" aria-label="Disabled group" disabled>
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup :default-value="['one']" aria-label="Disabled item">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two" disabled>Two</ToggleGroupItem>
    </ToggleGroup>
  </Stack>
</template>