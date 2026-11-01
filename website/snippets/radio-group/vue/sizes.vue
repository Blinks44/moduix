<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@moduix/vue/radio-group';
import { Stack } from '@moduix/vue/stack';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="4">
    <RadioGroup
      v-for="size in sizes"
      :key="size"
      :size="size"
      :default-value="size"
      :aria-label="`Size ${size}`"
    >
      <RadioGroupOption :value="size">{{ size.toUpperCase() }}</RadioGroupOption>
    </RadioGroup>
  </Stack>
</template>