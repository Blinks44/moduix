<script lang="ts">
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadLabel,
  } from '@moduix/svelte/signature-pad';
  import type { SignaturePadDrawEndDetails } from '@moduix/svelte/signature-pad';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/signature-pad/signature-pad-image-preview.module.css';

  const imageType = 'image/png';
  let imageUrl = $state('');

  const handleDrawEnd = (details: SignaturePadDrawEndDetails) => {
    void details.getDataUrl(imageType).then((url) => {
      imageUrl = url;
    });
  };
</script>

<Stack align="center" gap="3">
  <SignaturePad onDrawEnd={handleDrawEnd}>
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadCanvas />
  </SignaturePad>
  {#if imageUrl}
    <img src={imageUrl} alt="Signature preview" class={styles.preview} />
  {:else}
    <div class={styles.placeholder}>Preview appears after signing</div>
  {/if}
</Stack>