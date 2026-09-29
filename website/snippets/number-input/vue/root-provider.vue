<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRootProvider,
  useNumberInput,
} from '@moduix/vue/number-input';
import styles from '@/components/examples/number-input/number-input-root-provider.module.css';

const numberInput = useNumberInput({
  defaultValue: '3',
  min: 1,
  max: 10,
});

const setToMin = () => numberInput.value.setToMin();
const setToMax = () => numberInput.value.setToMax();
</script>

<template>
  <div :class="styles.root">
    <NumberInputRootProvider :value="numberInput">
      <NumberInputLabel>Guests</NumberInputLabel>
      <NumberInputField />
    </NumberInputRootProvider>
    <output>Value: {{ numberInput.value }}</output>
    <Button type="button" size="sm" variant="outline" @click="setToMin">Min</Button>
    <Button type="button" size="sm" variant="outline" @click="setToMax">Max</Button>
  </div>
</template>