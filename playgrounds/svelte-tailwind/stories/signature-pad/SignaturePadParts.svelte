<script lang="ts">
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadLabel,
    type SignaturePadRootProps,
  } from '@/components/signature-pad';

  let { label = 'Sign below', ...props }: SignaturePadRootProps & { label?: string } = $props();
</script>

<SignaturePad {...props}>
  <SignaturePadLabel>{label}</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>