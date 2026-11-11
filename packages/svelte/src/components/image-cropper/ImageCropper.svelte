<script lang="ts">
  import { ImageCropperRoot, type ImageCropperRootProps } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let {
    class: className,
    flip = $bindable(),
    ref = $bindable(null),
    rotation = $bindable(),
    zoom = $bindable(),
    ...props
  }: ImageCropperRootProps = $props();
</script>

<ImageCropperRoot
  {...props}
  bind:ref
  bind:flip
  bind:rotation
  bind:zoom
  class={clsx(styles.root, className)}
  data-slot="image-cropper-root"
/>