<script lang="ts">
  import { SignaturePadRootProvider, useSignaturePad } from '@/components/signature-pad';
  import Parts from './Parts.svelte';

  let { readOnly }: { readOnly?: boolean } = $props();

  const pad = useSignaturePad(() => ({
    id: 'hook-pad',
    defaultPaths: ['M1,1 L2,2'],
    translations: { clearTrigger: 'Clear signature', control: 'Signature drawing area' },
    readOnly,
  }));
</script>

<SignaturePadRootProvider value={pad}>
  <Parts />
  <output data-testid="read-only">{pad().readOnly}</output>
</SignaturePadRootProvider>