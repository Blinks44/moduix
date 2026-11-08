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
    FileUploadItemSizeText,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-directory-upload.module.css';
  const maxFiles = 20;
</script>

<FileUpload class={styles.root} directory {maxFiles}>
  <FileUploadLabel>Folder</FileUploadLabel>
  <FileUploadTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Choose folder</Button>
    {/snippet}
  </FileUploadTrigger>
  <FileUploadItemGroup>
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name + file.size)}
          <FileUploadItem {file}>
            <FileUploadItemName>{file.webkitRelativePath || file.name}</FileUploadItemName>
            <FileUploadItemSizeText />
            <FileUploadItemDeleteTrigger />
          </FileUploadItem>
        {/each}
      {/snippet}
    </FileUploadContext>
  </FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>