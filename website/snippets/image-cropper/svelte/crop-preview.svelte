<script lang="ts">
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
  const imageCropper = useImageCropper({ id, cropShape: 'circle', aspectRatio: 1 });
  let preview = $state<string>();
  let status = $state('Preview not created');

  const handleCrop = async () => {
    try {
      const result = await imageCropper().getCroppedImage({ output: 'dataUrl' });

      if (typeof result === 'string') {
        preview = result;
        status = 'Preview created';
      } else {
        preview = undefined;
        status = 'Image is not ready';
      }
    } catch {
      preview = undefined;
      status = 'Preview could not be created';
    }
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
    <output>{status}</output>
  </div>
  {#if preview}
    <img src={preview} alt="Cropped preview" width="128" height="128" />
  {/if}
  <Button type="button" onclick={handleCrop}>Create crop preview</Button>
</div>