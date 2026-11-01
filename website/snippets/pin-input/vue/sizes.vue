<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
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
  <Stack gap="3">
    <PinInput v-for="[size, label] in sizes" :key="size" :count="4" :size="size">
      <PinInputLabel>{{ label }}</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  </Stack>
</template>