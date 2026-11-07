<script lang="ts">
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@/components/image-cropper';
  import landscape from '../fixtures/landscape.svg';

  let rootRef = $state<HTMLElement | null>(null);
  let selectionRef = $state<HTMLElement | null>(null);
  let viewportRef = $state<HTMLElement | null>(null);
  let imageRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ imageRef, rootRef, selectionRef, viewportRef });
</script>

<ImageCropper
  bind:ref={rootRef}
  aria-label="Landscape crop"
  data-probe="root"
  class="consumer-root"
>
  <ImageCropperViewport bind:ref={viewportRef} class="consumer-viewport">
    <ImageCropperImage bind:ref={imageRef} src={landscape} alt="Landscape" class="consumer-image" />
    <ImageCropperCropArea bind:ref={selectionRef} class="consumer-selection" />
  </ImageCropperViewport>
</ImageCropper>