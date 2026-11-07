<script lang="ts">
  import {
    FileUpload,
    FileUploadContext,
    FileUploadItem,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadItemSizeText,
  } from '@/components/file-upload';

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
</script>

<FileUpload defaultAcceptedFiles={[file]}>
  <FileUploadItemGroup>
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().acceptedFiles as item (item.name)}
          <FileUploadItem file={item}>
            <FileUploadItemName /><FileUploadItemSizeText />
          </FileUploadItem>
        {/each}
      {/snippet}
    </FileUploadContext>
  </FileUploadItemGroup>
</FileUpload>