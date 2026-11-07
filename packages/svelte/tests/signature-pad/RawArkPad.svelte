<script lang="ts">
  import { useSignaturePad as useArkSignaturePad } from '@ark-ui/svelte/signature-pad';
  import { SignaturePadRootProvider } from '@/components/signature-pad';
  import Parts from './Parts.svelte';

  const pad = useArkSignaturePad({
    id: 'raw-pad',
    defaultPaths: ['M1,1 L2,2'],
    translations: { clearTrigger: 'Clear signature', control: 'Signature drawing area' },
  });
</script>

<SignaturePadRootProvider value={pad}>
  <Parts />
</SignaturePadRootProvider>