<script lang="ts">
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@moduix/svelte/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
</script>

<ImageCropper
  fixedCropArea
  cropShape="circle"
  aspectRatio={1}
  initialCrop={{ x: 112, y: 64, width: 220, height: 220 }}
  aria-label="Image cropper"
>
  <ImageCropperViewport>
    <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
    <ImageCropperCropArea />
  </ImageCropperViewport>
</ImageCropper>