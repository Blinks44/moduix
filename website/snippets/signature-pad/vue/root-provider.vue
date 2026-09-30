<script setup lang="ts">
import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/vue/signature-pad';
import styles from '@/components/examples/signature-pad/signature-pad-root-provider.module.css';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};
const signaturePad = useSignaturePad({ translations: signaturePadTranslations });
</script>

<template>
  <div :class="styles.root">
    <SignaturePadRootProvider :value="signaturePad">
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePadRootProvider>
    <output>Paths: {{ signaturePad.paths.length }}</output>
  </div>
</template>