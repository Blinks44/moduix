<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import { Stack } from '@moduix/vue/stack';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;
</script>

<template>
  <Stack align="flex-start" gap="3">
    <NumberInput v-for="[size, label] in sizes" :key="size" :size="size" default-value="8">
      <NumberInputLabel>{{ label }}</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </Stack>
</template>