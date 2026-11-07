<script lang="ts">
  import {
    ImageCropperViewport,
    type ImageCropperViewportProps,
  } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperViewportProps = $props();
</script>

<ImageCropperViewport
  {...props}
  bind:ref
  class={clsx(styles.viewport, className)}
  data-slot="image-cropper-viewport"
/>