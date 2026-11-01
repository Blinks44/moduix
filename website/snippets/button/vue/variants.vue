<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </Stack>
</template>