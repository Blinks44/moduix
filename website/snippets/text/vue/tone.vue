<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Stack gap="3">
    <Text tone="default">Default tone</Text>
    <Text tone="muted">Muted tone</Text>
    <Text tone="primary">Primary tone</Text>
    <Text tone="destructive">Destructive tone</Text>
  </Stack>
</template>