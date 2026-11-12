<script lang="ts">
  import {
    SignaturePadCanvas,
    SignaturePadLabel,
    SignaturePadRootProvider,
    useSignaturePad,
  } from '@moduix/svelte/signature-pad';
  import { Stack } from '@moduix/svelte/stack';

  const signaturePadTranslations = {
    control: 'Signature drawing area',
    clearTrigger: 'Clear signature',
  };
  const id = $props.id();
  const signaturePad = useSignaturePad({ id, translations: signaturePadTranslations });
</script>

<Stack align="center" gap="3">
  <SignaturePadRootProvider value={signaturePad}>
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadCanvas />
  </SignaturePadRootProvider>
  <div data-preview-meta>
    <output>Paths: {signaturePad().paths.length}</output>
  </div>
</Stack>