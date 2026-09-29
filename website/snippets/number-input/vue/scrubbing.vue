<script setup lang="ts">
import {
  NumberInput,
  NumberInputField,
  NumberInputLabel,
  NumberInputScrubber,
} from '@moduix/vue/number-input';
import { ref } from 'vue';
import styles from '@/components/examples/number-input/number-input-scrubbing.module.css';

const value = ref('250');
</script>

<template>
  <div :class="styles.root">
    <NumberInput v-model="value">
      <NumberInputLabel>Adjust value</NumberInputLabel>
      <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
      <NumberInputField />
    </NumberInput>
    <output>Value: {{ value }}</output>
  </div>
</template>