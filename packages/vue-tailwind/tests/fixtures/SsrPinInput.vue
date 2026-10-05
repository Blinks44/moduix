<script setup lang="ts">
import {
  PinInput,
  PinInputLabel,
  PinInputControl,
  PinInputInputs,
} from '../../src/components/pin-input';
</script>

<template>
  <PinInput :count="4"
    ><PinInputLabel>Verification code</PinInputLabel
    ><PinInputControl><PinInputInputs /></PinInputControl
  ></PinInput>
</template>