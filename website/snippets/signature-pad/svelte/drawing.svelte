<script lang="ts">
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadLabel,
  } from '@moduix/svelte/signature-pad';

  const drawing = {
    fill: '#2563eb',
    size: 4,
    simulatePressure: false,
  };
</script>

<SignaturePad {drawing}>
  <SignaturePadLabel>Sign below</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>