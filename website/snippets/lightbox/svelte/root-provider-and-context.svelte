<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
    LightboxRootProvider,
    useLightbox,
  } from '@moduix/svelte/lightbox';
  import LightboxStatus from './LightboxStatus.svelte';

  const image = {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a green forest',
  };

  const id = $props.id();
  const lightbox = useLightbox({ id });
</script>

<Button onclick={() => lightbox().setOpen(true)}>
  Lightbox is {lightbox().open ? 'open' : 'closed'}
</Button>
<LightboxRootProvider value={lightbox}>
  <LightboxPositioner>
    <LightboxContent aria-label={image.alt}>
      <LightboxCloseIcon />
      <LightboxImage src={image.src} alt={image.alt} />
      <LightboxStatus />
    </LightboxContent>
  </LightboxPositioner>
</LightboxRootProvider>