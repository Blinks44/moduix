<script setup lang="ts">
import { CloseButton } from '@moduix/vue/close-button';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack gap="2">
    <Stack direction="row" align="center" gap="2">
      <CloseButton disabled aria-label="Close unavailable message" />
      <span>Native disabled</span>
    </Stack>
    <Stack direction="row" align="center" gap="2">
      <CloseButton aria-disabled="true" aria-label="Close unavailable notification" />
      <span>ARIA disabled</span>
    </Stack>
  </Stack>
</template>