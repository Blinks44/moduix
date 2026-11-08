<script lang="ts">
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import {
    SignaturePad,
    SignaturePadClearTrigger,
    SignaturePadControl,
    SignaturePadGuide,
    SignaturePadLabel,
    SignaturePadSegment,
  } from '@moduix/svelte/signature-pad';

  const signaturePadTranslations = {
    control: 'Signature drawing area',
    clearTrigger: 'Clear signature',
  };
</script>

<SignaturePad translations={signaturePadTranslations}>
  <SignaturePadLabel>Sign below</SignaturePadLabel>
  <SignaturePadControl>
    <SignaturePadSegment />
    <SignaturePadClearTrigger>
      <RotateCcwIcon aria-hidden="true" />
    </SignaturePadClearTrigger>
    <SignaturePadGuide />
  </SignaturePadControl>
</SignaturePad>