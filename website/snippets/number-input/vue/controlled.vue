<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const value = ref('24');
</script>

<template>
  <Stack align="center">
    <NumberInput v-model="value">
      <NumberInputLabel>Controlled value</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <div data-preview-meta>
      <output>Current value: {{ value || 'empty' }}</output>
    </div>
  </Stack>
</template>