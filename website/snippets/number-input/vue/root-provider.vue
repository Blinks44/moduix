<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRootProvider,
  useNumberInput,
} from '@moduix/vue/number-input';
import { Stack } from '@moduix/vue/stack';

const numberInput = useNumberInput({
  defaultValue: '3',
  min: 1,
  max: 10,
});

const setToMin = () => numberInput.value.setToMin();
const setToMax = () => numberInput.value.setToMax();
</script>

<template>
  <Stack align="center">
    <NumberInputRootProvider :value="numberInput">
      <NumberInputLabel>Guests</NumberInputLabel>
      <NumberInputField />
    </NumberInputRootProvider>
    <div data-preview-meta>
      <output>Value: {{ numberInput.value }}</output>
      <Button type="button" size="sm" variant="outline" @click="setToMin">Min</Button>
      <Button type="button" size="sm" variant="outline" @click="setToMax">Max</Button>
    </div>
  </Stack>
</template>