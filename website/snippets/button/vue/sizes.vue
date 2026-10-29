<script setup lang="ts">
import { Star as StarIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconSizes = [
  { label: 'Small favorite', size: 'icon-sm' },
  { label: 'Favorite', size: 'icon-md' },
  { label: 'Large favorite', size: 'icon-lg' },
] as const;
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
    <Button v-for="size in sizes" :key="size" :size="size">{{ size }}</Button>
    <Button
      v-for="item in iconSizes"
      :key="item.size"
      :size="item.size"
      variant="outline"
      :aria-label="item.label"
    >
      <StarIcon />
    </Button>
  </Stack>
</template>