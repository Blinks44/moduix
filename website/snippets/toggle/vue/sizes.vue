<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Toggle } from '@moduix/vue/toggle';
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
    <Toggle size="xs">Extra-small</Toggle>
    <Toggle size="sm">Small</Toggle>
    <Toggle size="md">Medium</Toggle>
    <Toggle size="lg">Large</Toggle>
  </Stack>
</template>