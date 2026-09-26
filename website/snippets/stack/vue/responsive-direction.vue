<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack
    :direction="{ mobile: 'column', desktop: 'row' }"
    :gap="12"
    justify="center"
    style="inline-size: 100%"
  >
    <strong>Adaptive layout</strong>
    <span>Column on mobile, row from desktop width.</span>
  </Stack>
</template>