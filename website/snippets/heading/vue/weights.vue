<script setup lang="ts">
import { Heading } from '@moduix/vue/heading';
import { Stack } from '@moduix/vue/stack';

const headingWeights = [
  { weight: 'regular', label: 'Regular weight' },
  { weight: 'medium', label: 'Medium weight' },
  { weight: 'semibold', label: 'Semibold weight' },
  { weight: 'bold', label: 'Bold weight' },
] as const;
</script>

<template>
  <Stack :gap="3">
    <Heading v-for="item in headingWeights" :key="item.weight" as="h2" :weight="item.weight">
      {{ item.label }}
    </Heading>
  </Stack>
</template>