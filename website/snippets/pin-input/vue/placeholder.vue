<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
</script>

<template>
  <PinInput :count="6" placeholder="*">
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
  </PinInput>
</template>