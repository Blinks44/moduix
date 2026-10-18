<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
import styles from '@/components/examples/pin-input/pin-input-sizes.module.css';

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
    <PinInput v-for="[size, label] in sizes" :key="size" :count="4" :size="size">
      <PinInputLabel>{{ label }}</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  </div>
</template>