<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import {
    ImageCropper,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
    type ImageCropperRootProps,
  } from '@/components/image-cropper';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

  let {
    cropAreaClassName,
    zoom = $bindable(),
    ...props
  }: ImageCropperRootProps & { cropAreaClassName?: ClassValue } = $props();
</script>

<ImageCropper {...props} bind:zoom>
  <ImageCropperViewport>
    <ImageCropperImage src={sampleImage} crossorigin="anonymous" />
    <ImageCropperCropArea class={cropAreaClassName} />
  </ImageCropperViewport>
</ImageCropper>