<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack direction="row" :gap="8" wrap="wrap">
    <span style="border-radius: 9999px; background: var(--moduix-color-muted); padding: 8px 12px"
      >Design</span
    >
    <span style="border-radius: 9999px; background: var(--moduix-color-muted); padding: 8px 12px"
      >Engineering</span
    >
    <span style="border-radius: 9999px; background: var(--moduix-color-muted); padding: 8px 12px"
      >Docs</span
    >
    <span style="border-radius: 9999px; background: var(--moduix-color-muted); padding: 8px 12px"
      >Release</span
    >
  </Stack>
</template>