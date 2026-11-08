<script lang="ts">
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadLabel,
  } from '@moduix/svelte/signature-pad';

  const signaturePadTranslations = {
    control: 'Signature drawing area',
    clearTrigger: 'Clear signature',
  };
</script>

<SignaturePad translations={signaturePadTranslations}>
  <SignaturePadLabel>Sign below</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>