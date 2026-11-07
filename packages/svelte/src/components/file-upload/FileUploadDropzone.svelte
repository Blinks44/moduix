<script lang="ts">
  import { FileUploadDropzone, type FileUploadDropzoneProps } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadDropzoneProps = $props();
</script>

<FileUploadDropzone
  {...props}
  bind:ref
  class={clsx(styles.dropzone, className)}
  data-slot="file-upload-dropzone"
/>