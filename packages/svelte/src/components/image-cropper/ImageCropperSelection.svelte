<script lang="ts">
  import {
    ImageCropperSelection,
    type ImageCropperSelectionProps,
  } from '@ark-ui/svelte/image-cropper';
  import { clsx } from 'clsx';
  import styles from './ImageCropper.module.css';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperSelectionProps = $props();
</script>

<ImageCropperSelection
  {...props}
  bind:ref
  class={clsx(styles.selection, className)}
  data-slot="image-cropper-selection"
/>