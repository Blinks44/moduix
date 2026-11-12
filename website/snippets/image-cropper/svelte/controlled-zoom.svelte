<script lang="ts">
  import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
  import ZoomOutIcon from '@lucide/svelte/icons/zoom-out';
  import { Button } from '@moduix/svelte/button';
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@moduix/svelte/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
  const minZoom = 0.5;
  const maxZoom = 3;
  let zoom = $state(1);
</script>

<div>
  <ImageCropper bind:zoom {minZoom} {maxZoom} aria-label="Image cropper">
    <ImageCropperViewport>
      <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
  <div data-preview-meta>
    <output>Zoom: {zoom.toFixed(1)}x</output>
    <Button
      size="sm"
      type="button"
      aria-label="Zoom out"
      onclick={() => (zoom = Math.max(minZoom, zoom - 0.1))}
    >
      <ZoomOutIcon />
    </Button>
    <Button
      size="sm"
      type="button"
      aria-label="Zoom in"
      onclick={() => (zoom = Math.min(maxZoom, zoom + 0.1))}
    >
      <ZoomInIcon />
    </Button>
  </div>
</div>