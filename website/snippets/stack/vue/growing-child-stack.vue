<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack direction="row" align="center" :gap="12" style="inline-size: 100%">
    <div
      aria-hidden="true"
      style="
        width: 40px;
        height: 40px;
        flex: none;
        border-radius: 9999px;
        background: var(--moduix-color-muted);
      "
    />
    <Stack direction="column" :gap="8" fill>
      <div
        aria-hidden="true"
        style="width: 48%; height: 16px; background: var(--moduix-color-muted)"
      />
      <div aria-hidden="true" style="height: 14px; background: var(--moduix-color-muted)" />
    </Stack>
  </Stack>
</template>