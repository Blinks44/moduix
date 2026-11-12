<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@moduix/svelte/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

  const aspectRatios = [
    { label: '16:9', value: 16 / 9 },
    { label: '1:1', value: 1 },
    { label: '9:16', value: 9 / 16 },
  ];

  let aspectRatio = $state(16 / 9);
</script>

<div>
  <ImageCropper {aspectRatio} aria-label="Image cropper">
    <ImageCropperViewport>
      <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
  <div data-preview-meta>
    <output>
      Aspect ratio:
      {aspectRatios.find((aspect) => aspect.value === aspectRatio)?.label}
    </output>
  </div>
  {#each aspectRatios as aspect (aspect.label)}
    <Button size="sm" type="button" onclick={() => (aspectRatio = aspect.value)}>
      {aspect.label}
    </Button>
  {/each}
</div>