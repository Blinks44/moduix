<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Tag, TagLabel } from '@moduix/vue/tag';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
    <Tag v-for="variant in variants" :key="variant" :variant="variant">
      <TagLabel>{{ variant }}</TagLabel>
    </Tag>
  </Stack>
</template>