<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import { ref } from 'vue';
import styles from '@/components/examples/number-input/number-input-controlled.module.css';

const value = ref('24');
</script>

<template>
  <div :class="styles.root">
    <NumberInput v-model="value">
      <NumberInputLabel>Controlled value</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <output>Current value: {{ value || 'empty' }}</output>
  </div>
</template>