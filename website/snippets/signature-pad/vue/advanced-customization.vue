<script setup lang="ts">
import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadLabel,
  SignaturePadSegment,
} from '@moduix/vue/signature-pad';
</script>

<template>
  <SignaturePad>
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadControl>
      <SignaturePadSegment />
      <SignaturePadClearTrigger aria-label="Clear signature">Clear</SignaturePadClearTrigger>
      <SignaturePadGuide />
    </SignaturePadControl>
  </SignaturePad>
</template>