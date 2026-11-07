<script lang="ts">
  import {
    ImageCropperRootProvider,
    type ImageCropperRootProviderProps,
  } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ImageCropperRootProviderProps = $props();
</script>

<ImageCropperRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="image-cropper-root-provider"
/>