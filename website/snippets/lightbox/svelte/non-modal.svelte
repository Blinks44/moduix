<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Lightbox,
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
    LightboxTrigger,
  } from '@moduix/svelte/lightbox';
  import styles from '@/components/examples/lightbox/lightbox-non-modal.module.css';

  const image = {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a green forest',
  };

  let backgroundActions = $state(0);
</script>

<Lightbox modal={false}>
  <LightboxTrigger class={styles.button}>Open non-modal lightbox</LightboxTrigger>
  <LightboxPositioner>
    <LightboxContent aria-label={image.alt}>
      <LightboxCloseIcon />
      <LightboxImage src={image.src} alt={image.alt} />
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>
<div>
  <output>Background actions: {backgroundActions}</output>
  <Button variant="outline" onclick={() => (backgroundActions += 1)}>Run background action</Button>
</div>