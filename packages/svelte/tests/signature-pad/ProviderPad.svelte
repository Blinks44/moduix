<script lang="ts">
  import { SignaturePadRootProvider, useSignaturePad } from '@/components/signature-pad';
  import Parts from './Parts.svelte';

  const defaultPaths = ['M1,1 L2,2'];
  const translations = { clearTrigger: 'Clear signature', control: 'Signature drawing area' };
  const readOnlyPad = useSignaturePad({
    id: 'read-only-pad',
    defaultPaths,
    readOnly: true,
    translations,
  });
  const signaturePad = useSignaturePad({ id: 'provider-pad', defaultPaths, translations });
</script>

<SignaturePadRootProvider value={signaturePad} data-probe="provider">
  <Parts label="Provider signature" />
</SignaturePadRootProvider>
<SignaturePadRootProvider value={readOnlyPad}>
  <Parts label="Read-only provider signature" />
</SignaturePadRootProvider>