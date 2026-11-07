<script lang="ts">
  import {
    FileUploadItemSizeText,
    type FileUploadItemSizeTextProps,
  } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemSizeTextProps = $props();
</script>

<FileUploadItemSizeText
  {...props}
  bind:ref
  class={clsx(styles.itemSizeText, className)}
  data-slot="file-upload-item-size-text"
/>