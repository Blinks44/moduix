<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
</script>

<template>
  <NumberInput default-value="10" :min="0" :max="20" :step="2">
    <NumberInputLabel>Quantity (0-20, step 2)</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</template>