<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack :gap="16" style="inline-size: 100%">
    <Skeleton :height="144" border-radius="var(--moduix-radius-lg)" />
    <Stack :gap="12">
      <Skeleton width="62%" :height="18" />
      <Skeleton :height="14" />
      <Skeleton width="78%" :height="14" />
    </Stack>
  </Stack>
</template>