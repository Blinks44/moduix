<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '../src/components/number-input';
</script>

<template>
  <NumberInput default-value="7">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</template>