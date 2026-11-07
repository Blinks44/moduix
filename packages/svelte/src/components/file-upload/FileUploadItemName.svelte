<script lang="ts">
  import { FileUploadItemName, type FileUploadItemNameProps } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemNameProps = $props();
</script>

<FileUploadItemName
  {...props}
  bind:ref
  class={clsx(styles.itemName, className)}
  data-slot="file-upload-item-name"
/>