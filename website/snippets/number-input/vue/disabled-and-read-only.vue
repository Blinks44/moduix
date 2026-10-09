<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import styles from '@/components/examples/number-input/number-input-disabled-and-read-only.module.css';
</script>

<template>
  <div :class="styles.root">
    <NumberInput default-value="4" disabled>
      <NumberInputLabel>Disabled quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput default-value="8" read-only>
      <NumberInputLabel>Read-only quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </div>
</template>