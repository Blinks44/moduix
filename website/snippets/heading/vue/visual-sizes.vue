<script setup lang="ts">
import { Heading } from '@moduix/vue/heading';
import { Stack } from '@moduix/vue/stack';

const headingSizes = [
  { size: '2xl', label: 'Extra-large heading' },
  { size: 'xl', label: 'Large heading' },
  { size: 'lg', label: 'Medium-large heading' },
  { size: 'md', label: 'Medium heading' },
  { size: 'sm', label: 'Small heading' },
  { size: 'xs', label: 'Extra-small heading' },
] as const;
</script>

<template>
  <Stack :gap="3">
    <Heading v-for="item in headingSizes" :key="item.size" as="h2" :size="item.size">
      {{ item.label }}
    </Heading>
  </Stack>
</template>