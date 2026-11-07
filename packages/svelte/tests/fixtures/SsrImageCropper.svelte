<script lang="ts">
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@/components/image-cropper';
  import landscape from './landscape.svg';
</script>

<ImageCropper aria-label="SSR crop">
  <ImageCropperViewport>
    <ImageCropperImage src={landscape} alt="Landscape" />
    <ImageCropperCropArea />
  </ImageCropperViewport>
</ImageCropper>