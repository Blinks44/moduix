<script lang="ts">
  import FlipHorizontalIcon from '@lucide/svelte/icons/flip-horizontal';
  import RestartIcon from '@lucide/svelte/icons/rotate-ccw';
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import RotateCwIcon from '@lucide/svelte/icons/rotate-cw';
  import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
  import ZoomOutIcon from '@lucide/svelte/icons/zoom-out';
  import { Button } from '@moduix/svelte/button';
  import {
    ImageCropper,
    ImageCropperContext,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@moduix/svelte/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
  let rotation = $state(0);
  let flip = $state({ horizontal: false, vertical: false });
</script>

<div>
  <ImageCropper bind:rotation bind:flip aria-label="Image cropper">
    <ImageCropperContext>
      {#snippet render(context)}
        <div>
          <Button
            size="sm"
            type="button"
            aria-label="Zoom out"
            onclick={() => context().zoomBy(-0.1)}
          >
            <ZoomOutIcon />
          </Button>
          <Button
            size="sm"
            type="button"
            aria-label="Zoom in"
            onclick={() => context().zoomBy(0.1)}
          >
            <ZoomInIcon />
          </Button>
          <Button
            size="sm"
            type="button"
            aria-label="Rotate counterclockwise"
            onclick={() => context().rotateBy(-90)}
          >
            <RotateCcwIcon />
          </Button>
          <Button
            size="sm"
            type="button"
            aria-label="Rotate clockwise"
            onclick={() => context().rotateBy(90)}
          >
            <RotateCwIcon />
          </Button>
          <Button
            size="sm"
            type="button"
            aria-label="Flip horizontally"
            onclick={() => context().flipHorizontally()}
          >
            <FlipHorizontalIcon />
          </Button>
          <Button size="sm" type="button" aria-label="Reset crop" onclick={() => context().reset()}>
            <RestartIcon />
          </Button>
        </div>
      {/snippet}
    </ImageCropperContext>
    <ImageCropperViewport>
      <ImageCropperImage src={sampleImage} alt="Landscape" crossorigin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
  <output>Rotation: {rotation}deg, horizontal flip: {String(flip.horizontal)}</output>
</div>