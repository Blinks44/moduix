<script lang="ts">
  import {
    FileUploadItemPreviewImage,
    type FileUploadItemPreviewImageProps,
  } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: FileUploadItemPreviewImageProps = $props();
</script>

<FileUploadItemPreviewImage
  {...props}
  bind:ref
  class={clsx(styles.itemPreviewImage, className)}
  data-slot="file-upload-item-preview-image"
/>