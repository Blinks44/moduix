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
  import styles from '@/components/examples/file-upload/file-upload-initial-files.module.css';
  const initialFiles = [new File(['Welcome to moduix'], 'README.md', { type: 'text/plain' })];
</script>

<FileUpload class={styles.root} defaultAcceptedFiles={initialFiles}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Choose files</Button>
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
  <FileUploadHiddenInput />
</FileUpload>