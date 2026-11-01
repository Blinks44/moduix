<script setup lang="ts">
import { Minus as MinusIcon, Plus as PlusIcon } from '@lucide/vue';
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '@moduix/vue/number-input';
</script>

<template>
  <NumberInput default-value="100">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputControl>
      <NumberInputDecrementTrigger>
        <MinusIcon :stroke-width="3" />
      </NumberInputDecrementTrigger>
      <NumberInputInput />
      <NumberInputIncrementTrigger>
        <PlusIcon :stroke-width="3" />
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
</template>