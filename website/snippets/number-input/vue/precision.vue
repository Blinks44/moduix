<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
</script>

<template>
  <NumberInput
    default-value="12.5"
    :step="0.25"
    :format-options="{
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }"
  >
    <NumberInputLabel>Hours</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</template>