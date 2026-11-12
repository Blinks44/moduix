<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Stack direction="row" align="center" justify="space-between" gap="3" style="inline-size: 100%">
    <Text weight="semibold">Status</Text>
    <Text tone="muted">Ready to publish</Text>
  </Stack>
</template>