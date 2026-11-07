<script lang="ts">
  import { FileUploadItemGroup, type FileUploadItemGroupProps } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemGroupProps = $props();
</script>

<FileUploadItemGroup
  {...props}
  bind:ref
  class={clsx(styles.itemGroup, className)}
  data-slot="file-upload-item-group"
/>