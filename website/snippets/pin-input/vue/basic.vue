<script setup lang="ts">
import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInputs,
  PinInputLabel,
} from '@moduix/vue/pin-input';
</script>

<template>
  <PinInput :count="6">
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</template>