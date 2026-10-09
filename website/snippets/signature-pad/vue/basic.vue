<script setup lang="ts">
import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/vue/signature-pad';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};
</script>

<template>
  <SignaturePad :translations="signaturePadTranslations">
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadCanvas />
  </SignaturePad>
</template>