<script setup lang="ts">
import { ref } from 'vue';
import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputLabel,
} from '../src/components/pin-input';

const value = ref<string[]>([]);
const lastValue = ref<string[]>([]);
</script>

<template>
  <form>
    <PinInput v-model="value" :count="4" name="code" @value-change="lastValue = $event.value">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInput :index="0" />
        <PinInputInput :index="1" />
        <PinInputInput :index="2" />
        <PinInputInput :index="3" />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  </form>
  <output>{{ lastValue.join('') }}</output>
</template>