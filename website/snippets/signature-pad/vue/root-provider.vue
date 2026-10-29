<script setup lang="ts">
import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/vue/signature-pad';
import { Stack } from '@moduix/vue/stack';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};
const signaturePad = useSignaturePad({ translations: signaturePadTranslations });
</script>

<template>
  <Stack align="center" gap="3">
    <SignaturePadRootProvider :value="signaturePad">
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePadRootProvider>
    <output>Paths: {{ signaturePad.paths.length }}</output>
  </Stack>
</template>