<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadContext,
    FileUploadDropzone,
    FileUploadDropzoneIcon,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadItemSizeText,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-accepted-file-types.module.css';

  const accept = 'image/png,image/jpeg';
  const maxFiles = 4;
</script>

<FileUpload class={styles.root} {accept} {maxFiles}>
  <FileUploadLabel>Images</FileUploadLabel>
  <FileUploadDropzone disableClick>
    <FileUploadDropzoneIcon />
    <div class={styles.dropzoneContent}>
      <span class={styles.dropzoneTitle}>Drop PNG or JPEG files here</span>
      <span class={styles.dropzoneDescription}>Only PNG and JPEG files are accepted</span>
      <FileUploadTrigger>
        {#snippet asChild(props)}
          <Button {...props()}>Select images</Button>
        {/snippet}
      </FileUploadTrigger>
    </div>
  </FileUploadDropzone>
  <FileUploadItemGroup>
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name + file.size)}
          <FileUploadItem {file}>
            <FileUploadItemName />
            <FileUploadItemSizeText />
            <FileUploadItemDeleteTrigger />
          </FileUploadItem>
        {/each}
      {/snippet}
    </FileUploadContext>
  </FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>