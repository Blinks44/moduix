<script lang="ts">
  import {
    ImageCropper,
    ImageCropperContext,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@/components/image-cropper';
  import landscape from '../fixtures/landscape.svg';

  let zoom = $state(1);
  const zoomChanges = $state<number[]>([]);

  export const getZoomChanges = () => zoomChanges;
</script>

<ImageCropper bind:zoom onZoomChange={(details) => zoomChanges.push(details.zoom)}>
  <ImageCropperContext>
    {#snippet render(context)}
      <button type="button" onclick={() => context().zoomBy(0.1)}>Zoom</button>
    {/snippet}
  </ImageCropperContext>
  <ImageCropperViewport>
    <ImageCropperImage src={landscape} />
    <ImageCropperCropArea />
  </ImageCropperViewport>
</ImageCropper>
<output>{zoom}</output>