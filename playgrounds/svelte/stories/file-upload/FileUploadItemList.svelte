<script lang="ts">
  import {
    FileUploadContext,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemMetadata,
    FileUploadItemName,
    FileUploadItemPreview,
    FileUploadItemPreviewIcon,
    FileUploadItemPreviewImage,
  } from '@/components/file-upload';
</script>

<FileUploadContext>
  {#snippet render(context)}
    {#each context().acceptedFiles as file (file.name + file.size)}
      <FileUploadItem {file}>
        <FileUploadItemPreview>
          {#if file.type.startsWith('image/')}
            <FileUploadItemPreviewImage />
          {:else}
            <FileUploadItemPreviewIcon />
          {/if}
        </FileUploadItemPreview>
        <FileUploadItemName />
        <FileUploadItemMetadata {file} />
        <FileUploadItemDeleteTrigger />
      </FileUploadItem>
    {/each}
  {/snippet}
</FileUploadContext>