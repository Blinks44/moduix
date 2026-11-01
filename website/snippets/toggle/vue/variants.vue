<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Toggle } from '@moduix/vue/toggle';
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
    <Toggle>Default</Toggle>
    <Toggle variant="outline">Outline</Toggle>
    <Toggle variant="ghost">Ghost</Toggle>
    <Toggle default-pressed>Pressed</Toggle>
  </Stack>
</template>