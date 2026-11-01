<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack direction="row" align="center" justify="center" gap="2.5" style="inline-size: 100%">
    <strong>Design</strong>
    <span
      role="separator"
      aria-hidden="true"
      style="inline-size: 1px; align-self: stretch; background: var(--moduix-border)"
    />
    <span>Engineering</span>
    <span
      role="separator"
      aria-hidden="true"
      style="inline-size: 1px; align-self: stretch; background: var(--moduix-border)"
    />
    <span>Docs</span>
  </Stack>
</template>