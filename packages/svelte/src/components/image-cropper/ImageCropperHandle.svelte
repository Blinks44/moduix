<script lang="ts">
  import { ImageCropperHandle, type ImageCropperHandleProps } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperHandleProps = $props();
</script>

<ImageCropperHandle
  {...props}
  bind:ref
  class={clsx(styles.handle, className)}
  data-slot="image-cropper-handle"
/>