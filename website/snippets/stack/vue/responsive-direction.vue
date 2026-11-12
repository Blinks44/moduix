<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Stack
    :direction="{ mobile: 'column', desktop: 'row' }"
    gap="3"
    justify="center"
    style="inline-size: 100%"
  >
    <Text weight="semibold">Adaptive layout</Text>
    <Text tone="muted">Column on mobile, row from desktop width.</Text>
  </Stack>
</template>