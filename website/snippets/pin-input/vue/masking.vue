<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
</script>

<template>
  <PinInput :count="4" mask>
    <PinInputLabel>PIN</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
  </PinInput>
</template>