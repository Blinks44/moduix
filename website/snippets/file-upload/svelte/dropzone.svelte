<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadDropzone,
    FileUploadDropzoneIcon,
    FileUploadHiddenInput,
    FileUploadItemGroup,
    FileUploadItems,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-dropzone.module.css';
  const maxFiles = 5;
</script>

<FileUpload class={styles.root} {maxFiles}>
  <FileUploadLabel>Project files</FileUploadLabel>
  <FileUploadDropzone disableClick>
    <FileUploadDropzoneIcon />
    <div class={styles.dropzoneContent}>
      <span class={styles.dropzoneTitle}>Drag and drop files here</span>
      <span class={styles.dropzoneDescription}>or browse from your device</span>
      <FileUploadTrigger>
        {#snippet asChild(props)}
          <Button {...props()}>Browse files</Button>
        {/snippet}
      </FileUploadTrigger>
    </div>
  </FileUploadDropzone>
  <FileUploadItemGroup>
    <FileUploadItems />
  </FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>