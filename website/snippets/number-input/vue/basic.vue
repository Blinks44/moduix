<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
</script>

<template>
  <NumberInput default-value="100">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</template>