<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Lightbox,
    LightboxBackdrop,
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
    LightboxTitle,
    LightboxTrigger,
  } from '@moduix/svelte/lightbox';
  import styles from '@/components/examples/lightbox/lightbox-focus-and-ids.module.css';

  const image = {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Mountain ridge at sunset',
  };

  const closeId = 'lightbox-focus-close';
  const triggerId = 'lightbox-focus-trigger';
  let focusReturned = $state(false);
  const initialFocusEl = () => document.getElementById(closeId);
  const finalFocusEl = () => document.getElementById(triggerId);
  const handleOpenChange = ({ open }: { open: boolean }) => {
    if (open) {
      focusReturned = false;
    }
  };
</script>

<Lightbox
  {initialFocusEl}
  {finalFocusEl}
  ids={{ content: 'lightbox-focus-content', title: 'lightbox-focus-title' }}
  onOpenChange={handleOpenChange}
>
  <LightboxTrigger class={styles.button}>Open focus-managed lightbox</LightboxTrigger>
  <LightboxBackdrop />
  <LightboxPositioner>
    <LightboxContent>
      <LightboxCloseIcon id={closeId} />
      <LightboxTitle class={styles.status}>{image.alt}</LightboxTitle>
      <LightboxImage src={image.src} alt={image.alt} />
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>
<div>
  <output>
    {focusReturned ? 'Focus returned to this button.' : 'Close the lightbox to return focus here.'}
  </output>
  <Button
    id={triggerId}
    class={styles.focusTarget}
    data-focus-returned={focusReturned ? '' : undefined}
    variant="outline"
    onfocus={() => (focusReturned = true)}
  >
    Focus returns here
  </Button>
</div>