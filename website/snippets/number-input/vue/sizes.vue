<script setup lang="ts">
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import styles from '@/components/examples/number-input/number-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;
</script>

<template>
  <div :class="styles.root">
    <NumberInput v-for="[size, label] in sizes" :key="size" :size="size" default-value="8">
      <NumberInputLabel>{{ label }}</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </div>
</template>