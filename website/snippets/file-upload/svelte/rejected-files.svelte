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
  import styles from '@/components/examples/file-upload/file-upload-rejected-files.module.css';
  const accept = 'image/*';
  const maxFiles = 2;
  const maxFileSize = 120_000;
</script>

<FileUpload class={styles.root} {accept} {maxFiles} {maxFileSize}>
  <FileUploadLabel>Images</FileUploadLabel>
  <FileUploadDropzone disableClick>
    <FileUploadDropzoneIcon />
    <div class={styles.dropzoneContent}>
      <span class={styles.dropzoneTitle}>Drop image files here</span>
      <span class={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
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
  <FileUploadItemGroup type="rejected">
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().rejectedFiles as { file, errors } (file.name + file.size)}
          <FileUploadItem {file}>
            <FileUploadItemName />
            <p class={styles.error}>{errors.join(', ')}</p>
            <FileUploadItemDeleteTrigger />
          </FileUploadItem>
        {/each}
      {/snippet}
    </FileUploadContext>
  </FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>