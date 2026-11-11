<script lang="ts">
  import { Trash2 as TrashIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadContext,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemMetadata,
    FileUploadItemName,
    FileUploadItemPreview,
    FileUploadItemPreviewIcon,
    FileUploadItemPreviewImage,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

  const maxFiles = 3;
  const isImageFile = (file: File) => file.type.startsWith('image/');
</script>

<FileUpload class={styles.root} {maxFiles}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadHiddenInput />
  <FileUploadTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Choose files</Button>
    {/snippet}
  </FileUploadTrigger>
  <FileUploadItemGroup>
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (`${file.name}-${file.size}`)}
          <FileUploadItem {file}>
            <FileUploadItemPreview>
              {#if isImageFile(file)}
                <FileUploadItemPreviewImage />
              {:else}
                <FileUploadItemPreviewIcon />
              {/if}
            </FileUploadItemPreview>
            <FileUploadItemName />
            <FileUploadItemMetadata {file} />
            <FileUploadItemDeleteTrigger>
              <TrashIcon />
            </FileUploadItemDeleteTrigger>
          </FileUploadItem>
        {/each}
      {/snippet}
    </FileUploadContext>
  </FileUploadItemGroup>
</FileUpload>