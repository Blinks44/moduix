<script lang="ts">
  import {
    FileUploadItemPreview,
    type FileUploadItemPreviewProps,
  } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemPreviewProps = $props();
</script>

<FileUploadItemPreview
  {...props}
  bind:ref
  class={clsx(styles.itemPreview, className)}
  data-slot="file-upload-item-preview"
/>