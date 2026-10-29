<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack align="flex-start" gap="0.75rem">
    <NumberInput default-value="4" disabled>
      <NumberInputLabel>Disabled quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput default-value="8" read-only>
      <NumberInputLabel>Read-only quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </Stack>
</template>