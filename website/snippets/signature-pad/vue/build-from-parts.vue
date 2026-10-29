<script setup lang="ts">
import { RotateCcw as RotateCcwIcon } from '@lucide/vue';
import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadLabel,
  SignaturePadSegment,
} from '@moduix/vue/signature-pad';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};
</script>

<template>
  <SignaturePad :translations="signaturePadTranslations">
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadControl>
      <SignaturePadSegment />
      <SignaturePadClearTrigger>
        <RotateCcwIcon aria-hidden="true" />
      </SignaturePadClearTrigger>
      <SignaturePadGuide />
    </SignaturePadControl>
  </SignaturePad>
</template>