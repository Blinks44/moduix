<script lang="ts">
  import {
    ImageCropper,
    ImageCropperGrid,
    ImageCropperHandle,
    ImageCropperHandles,
    ImageCropperImage,
    ImageCropperSelection,
    ImageCropperViewport,
  } from '@moduix/svelte/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
</script>

<ImageCropper aria-label="Image cropper">
  <ImageCropperViewport>
    <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
    <ImageCropperSelection>
      <ImageCropperGrid axis="horizontal" />
      <ImageCropperGrid axis="vertical" />
      {#each ImageCropperHandles as position (position)}
        <ImageCropperHandle {position} />
      {/each}
    </ImageCropperSelection>
  </ImageCropperViewport>
</ImageCropper>