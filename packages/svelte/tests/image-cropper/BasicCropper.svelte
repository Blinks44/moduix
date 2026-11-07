<script lang="ts">
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
    type ImageCropperRootProps,
  } from '@/components/image-cropper';
  import landscape from '../fixtures/landscape.svg';

  let {
    src = landscape,
    width,
    ...props
  }: ImageCropperRootProps & { src?: string; width?: string } = $props();
</script>

<div style:width>
  <ImageCropper {...props}>
    <ImageCropperViewport>
      <ImageCropperImage {src} />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
</div>