<script lang="ts">
  import {
    LightboxContent,
    LightboxPositioner,
    LightboxRootProvider,
    useLightbox,
  } from '@/components/lightbox';
  import LightboxStatus from './LightboxStatus.svelte';

  const lightbox = useLightbox({ id: 'provider-lightbox' });
</script>

<button type="button" onclick={() => lightbox().setOpen(true)}>Open preview</button>
<LightboxRootProvider value={lightbox} portalled={false}>
  <LightboxPositioner>
    <LightboxContent aria-label="Image preview"><LightboxStatus /></LightboxContent>
  </LightboxPositioner>
</LightboxRootProvider>