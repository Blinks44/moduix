<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@/components/image-cropper';
  import landscape from '../fixtures/landscape.svg';

  let { selectionAttrs }: { selectionAttrs: HTMLAttributes<HTMLElement> } = $props();

  let selectionRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ selectionRef });
</script>

<ImageCropper>
  <ImageCropperViewport>
    <ImageCropperImage src={landscape} />
    <ImageCropperCropArea bind:ref={selectionRef} {...selectionAttrs} />
  </ImageCropperViewport>
</ImageCropper>