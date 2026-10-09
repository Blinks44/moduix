<script setup lang="ts">
import { ChevronDown, ChevronUp } from '@lucide/vue';
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '@moduix/vue/number-input';
import styles from '@/components/examples/number-input/number-input-advanced-customization.module.css';
</script>

<template>
  <NumberInput
    default-value="8"
    :translations="{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }"
  >
    <NumberInputLabel>Floors</NumberInputLabel>
    <NumberInputControl>
      <NumberInputDecrementTrigger :class="styles.button">
        <ChevronDown />
      </NumberInputDecrementTrigger>
      <NumberInputInput :class="styles.input" />
      <NumberInputIncrementTrigger :class="styles.button">
        <ChevronUp />
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
</template>