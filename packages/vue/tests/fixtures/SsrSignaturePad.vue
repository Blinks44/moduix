<script setup lang="ts">
import { SignaturePad, SignaturePadLabel, SignaturePadCanvas } from '@/components/signature-pad';
</script>
<template>
  <SignaturePad
    :default-paths="['M1,1 L2,2']"
    :translations="{ clearTrigger: 'Clear signature', control: 'Signature drawing area' }"
  >
    <SignaturePadLabel>Signature</SignaturePadLabel><SignaturePadCanvas />
  </SignaturePad>
</template>