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
  <PinInput :count="6" otp name="verificationCode">
    <PinInputLabel>One-time code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</template>