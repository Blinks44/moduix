<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadContext,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-error-handling.module.css';
  const accept = 'image/*';
  const maxFiles = 2;
  const maxFileSize = 120_000;
  let message = $state('');
</script>

<FileUpload
  class={styles.root}
  {accept}
  {maxFiles}
  {maxFileSize}
  onFileReject={(details) => (message = details.files.length + ' file(s) rejected')}
  onFileAccept={() => (message = 'Files accepted')}
>
  <FileUploadLabel>Images</FileUploadLabel>
  <FileUploadTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Select images</Button>
    {/snippet}
  </FileUploadTrigger>
  <FileUploadItemGroup>
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name + file.size)}
          <FileUploadItem {file}>
            <FileUploadItemName />
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
<output>Status: {message || 'No files selected'}</output>