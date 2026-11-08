<script lang="ts">
  import {
    Lightbox,
    LightboxBackdrop,
    LightboxBind,
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
  } from '@moduix/svelte/lightbox';
  import type { LightboxImageSelectDetails } from '@moduix/svelte/lightbox';
  import styles from '@/components/examples/lightbox/lightbox-bind-cms-content.module.css';

  const images = [
    {
      id: 'mountain',
      thumbnail:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
      alt: 'Mountain ridge at sunset',
    },
    {
      id: 'sea',
      thumbnail:
        'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
      src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
      alt: 'Sea cliffs under a cloudy sky',
    },
    {
      id: 'forest',
      thumbnail:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
      alt: 'Road through a green forest',
    },
  ];

  let rootRef = $state<HTMLElement | null>(null);
  let activeImage = $state<LightboxImageSelectDetails | null>(null);
</script>

<div bind:this={rootRef} class={styles.gallery}>
  {#each images as image (image.id)}
    <button type="button" class={styles.galleryTrigger}>
      <img src={image.thumbnail} data-lightbox-src={image.src} alt={image.alt} />
    </button>
  {/each}
</div>

<Lightbox>
  <LightboxBind
    rootRef={() => rootRef}
    selector="button"
    onImageSelect={(details) => (activeImage = details)}
  />
  <LightboxBackdrop />
  <LightboxPositioner>
    <LightboxContent aria-label={activeImage?.alt ?? 'Image preview'}>
      <LightboxCloseIcon />
      {#if activeImage}
        <LightboxImage src={activeImage.src} alt={activeImage.alt ?? ''} />
      {/if}
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>