<script lang="ts">
  import RestartIcon from '@lucide/svelte/icons/rotate-ccw';
  import { Button } from '@moduix/svelte/button';
  import {
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperRootProvider,
    ImageCropperViewport,
    useImageCropper,
  } from '@moduix/svelte/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
  const id = $props.id();
  const imageCropper = useImageCropper({ id, aspectRatio: 16 / 9 });
  let resets = $state(0);

  const handleReset = () => {
    imageCropper().reset();
    resets += 1;
  };
</script>

<div>
  <ImageCropperRootProvider value={imageCropper} aria-label="Image cropper">
    <ImageCropperViewport>
      <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropperRootProvider>
  <div data-preview-meta>
    <output>Resets: {resets}</output>
    <Button size="sm" type="button" aria-label="Reset crop" onclick={handleReset}>
      <RestartIcon />
    </Button>
  </div>
</div>