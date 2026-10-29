<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Toggle } from '@moduix/vue/toggle';
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
    <Toggle disabled>Disabled</Toggle>
    <Toggle default-pressed disabled>Pressed</Toggle>
  </Stack>
</template>