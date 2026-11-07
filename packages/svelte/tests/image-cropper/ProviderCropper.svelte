<script lang="ts">
  import {
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperRootProvider,
    ImageCropperViewport,
    useImageCropper,
  } from '@/components/image-cropper';
  import landscape from '../fixtures/landscape.svg';

  const imageCropper = useImageCropper({ id: 'provider-cropper', aspectRatio: 16 / 9 });
</script>

<ImageCropperRootProvider value={imageCropper} data-testid="image-cropper-provider">
  <ImageCropperViewport>
    <ImageCropperImage src={landscape} />
    <ImageCropperCropArea />
  </ImageCropperViewport>
</ImageCropperRootProvider>