<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack direction="row" align="center" :gap="12" style="inline-size: 100%">
    <Skeleton :box-size="40" border-radius="var(--moduix-radius-full)" />
    <Stack direction="column" :gap="8" fill>
      <Skeleton width="48%" :height="16" />
      <Skeleton :height="14" />
    </Stack>
  </Stack>
</template>