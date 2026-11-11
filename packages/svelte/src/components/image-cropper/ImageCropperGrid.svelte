<script lang="ts">
  import { ImageCropperGrid, type ImageCropperGridProps } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperGridProps = $props();
</script>

<ImageCropperGrid
  {...props}
  bind:ref
  class={clsx(styles.grid, className)}
  data-slot="image-cropper-grid"
/>