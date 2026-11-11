<script lang="ts">
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@/components/image-cropper';
  import landscape from '../fixtures/landscape.svg';

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<ImageCropper bind:ref={rootRef}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </section>
  {/snippet}
</ImageCropper>