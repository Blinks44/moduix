<script setup lang="ts">
import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/vue/signature-pad';

const drawing = {
  fill: '#2563eb',
  size: 4,
  simulatePressure: false,
};
</script>

<template>
  <SignaturePad :drawing="drawing">
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadCanvas />
  </SignaturePad>
</template>