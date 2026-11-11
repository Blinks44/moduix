<script lang="ts">
  import { useFileUploadContext } from '@ark-ui/svelte/file-upload';
  import FileUploadItem from './FileUploadItem.svelte';
  import FileUploadItemDeleteTrigger from './FileUploadItemDeleteTrigger.svelte';
  import FileUploadItemMetadata from './FileUploadItemMetadata.svelte';
  import FileUploadItemName from './FileUploadItemName.svelte';
  import FileUploadItemPreview from './FileUploadItemPreview.svelte';
  import FileUploadItemPreviewIcon from './FileUploadItemPreviewIcon.svelte';
  import FileUploadItemPreviewImage from './FileUploadItemPreviewImage.svelte';

  const fileUpload = useFileUploadContext();

  const isImageFile = (file: File) => file.type.startsWith('image/');
</script>

{#each fileUpload().acceptedFiles as file (`${file.name}-${file.size}`)}
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
    <FileUploadItemDeleteTrigger />
  </FileUploadItem>
{/each}