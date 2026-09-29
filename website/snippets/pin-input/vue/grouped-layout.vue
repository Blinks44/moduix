<script setup lang="ts">
import {
  PinInput,
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  PinInputSeparator,
} from '@moduix/vue/pin-input';

const firstIndexes = [0, 1, 2];
const lastIndexes = [3, 4, 5];
</script>

<template>
  <PinInput :count="6">
    <PinInputLabel>Auth code</PinInputLabel>
    <PinInputControl>
      <PinInputInput v-for="index in firstIndexes" :key="index" :index="index" />
      <PinInputSeparator />
      <PinInputInput v-for="index in lastIndexes" :key="index" :index="index" />
    </PinInputControl>
  </PinInput>
</template>