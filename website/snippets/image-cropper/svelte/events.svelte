<script lang="ts">
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@moduix/svelte/image-cropper';
  import { Stack } from '@moduix/svelte/stack';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
  let crop = $state({ x: 0, y: 0, width: 0, height: 0 });
  let zoom = $state(1);
</script>

<Stack align="center" gap="3">
  <ImageCropper
    aria-label="Image cropper"
    onCropChange={(details) => (crop = details.crop)}
    onZoomChange={(details) => (zoom = details.zoom)}
  >
    <ImageCropperViewport>
      <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
  <div data-preview-meta>
    <output>
      Zoom: {zoom.toFixed(2)}x, crop: {Math.round(crop.x)}, {Math.round(crop.y)},
      {Math.round(crop.width)} x {Math.round(crop.height)}
    </output>
  </div>
</Stack>