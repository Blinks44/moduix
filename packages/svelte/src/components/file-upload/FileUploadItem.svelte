<script lang="ts">
  import { FileUploadItem, type FileUploadItemProps } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemProps = $props();
</script>

<FileUploadItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-slot="file-upload-item"
/>