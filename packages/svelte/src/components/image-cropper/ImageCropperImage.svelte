<script lang="ts">
  import { ImageCropperImage, type ImageCropperImageProps } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperImageProps = $props();
</script>

<ImageCropperImage
  {...props}
  bind:ref
  class={clsx(styles.image, className)}
  data-slot="image-cropper-image"
/>