<script lang="ts">
  import {
    SignaturePadCanvas,
    SignaturePadHiddenInput,
    SignaturePadLabel,
    useSignaturePadContext,
  } from '@/components/signature-pad';

  let { label = 'Signature' }: { label?: string } = $props();

  const signaturePad = useSignaturePadContext();
</script>

<SignaturePadLabel>{label}</SignaturePadLabel>
<SignaturePadCanvas />
<SignaturePadHiddenInput value={signaturePad().paths.join(' ')} />