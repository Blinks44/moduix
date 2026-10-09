<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
</script>

<template>
  <NumberInput
    :min="0"
    :step="50"
    default-value="1250"
    :format-options="{
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }"
  >
    <NumberInputLabel>Price</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</template>