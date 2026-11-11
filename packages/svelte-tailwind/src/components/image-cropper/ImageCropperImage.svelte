<script lang="ts">
  import { ImageCropperImage, type ImageCropperImageProps } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperImageProps = $props();
</script>

<ImageCropperImage
  {...props}
  bind:ref
  class={cn('absolute inset-0 m-auto block max-h-full max-w-full', className)}
  data-slot="image-cropper-image"
/>