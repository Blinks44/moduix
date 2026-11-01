<script setup lang="ts">
import { Spinner } from '@moduix/vue/spinner';
import { Stack } from '@moduix/vue/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <Stack direction="row" align="center" gap="4">
    <Spinner v-for="size in sizes" :key="size" decorative :size="size" />
  </Stack>
</template>