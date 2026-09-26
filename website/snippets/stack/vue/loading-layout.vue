<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack :gap="16" style="inline-size: 100%">
    <div
      aria-hidden="true"
      style="
        height: 144px;
        border-radius: var(--moduix-radius-lg);
        background: var(--moduix-color-muted);
      "
    />
    <Stack :gap="12">
      <div
        aria-hidden="true"
        style="width: 62%; height: 18px; background: var(--moduix-color-muted)"
      />
      <div aria-hidden="true" style="height: 14px; background: var(--moduix-color-muted)" />
      <div
        aria-hidden="true"
        style="width: 78%; height: 14px; background: var(--moduix-color-muted)"
      />
    </Stack>
  </Stack>
</template>