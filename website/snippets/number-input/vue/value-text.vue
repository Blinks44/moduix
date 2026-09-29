<script setup lang="ts">
import {
  NumberInput,
  NumberInputField,
  NumberInputLabel,
  NumberInputValueText,
} from '@moduix/vue/number-input';
</script>

<template>
  <NumberInput default-value="42">
    <NumberInputLabel>Value preview</NumberInputLabel>
    <NumberInputField />
    <NumberInputValueText />
  </NumberInput>
</template>