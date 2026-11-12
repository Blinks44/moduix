<script setup lang="ts">
import {
  NumberInput,
  NumberInputField,
  NumberInputLabel,
  NumberInputScrubber,
} from '@moduix/vue/number-input';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const value = ref('250');
</script>

<template>
  <Stack align="center">
    <NumberInput v-model="value">
      <NumberInputLabel>Adjust value</NumberInputLabel>
      <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
      <NumberInputField />
    </NumberInput>
    <div data-preview-meta>
      <output>Value: {{ value }}</output>
    </div>
  </Stack>
</template>