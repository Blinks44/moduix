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
  import styles from '@/components/examples/file-upload/file-upload-media-capture.module.css';
  const capture = 'environment';
  const accept = 'image/*';
  const maxFiles = 1;
</script>

<FileUpload class={styles.root} {accept} {capture} {maxFiles}>
  <FileUploadLabel>Photo</FileUploadLabel>
  <FileUploadDropzone disableClick>
    <FileUploadDropzoneIcon />
    <div class={styles.dropzoneContent}>
      <span class={styles.dropzoneTitle}>Drop an image or open the camera</span>
      <span class={styles.dropzoneDescription}>One image from the environment camera</span>
      <FileUploadTrigger>
        {#snippet asChild(props)}
          <Button {...props()}>Open camera</Button>
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