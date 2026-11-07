<script lang="ts">
  import {
    FileUpload,
    FileUploadDropzone,
    FileUploadDropzoneIcon,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadItemPreview,
    FileUploadItemPreviewIcon,
    FileUploadLabel,
  } from '@/components/file-upload';

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
</script>

<FileUpload class="w-1/2 text-muted-foreground">
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadDropzone data-testid="dropzone">
    <FileUploadDropzoneIcon data-testid="icon" />
  </FileUploadDropzone>
  <FileUploadItemGroup>
    <FileUploadItem {file}>
      <FileUploadItemPreview data-testid="preview"
        ><FileUploadItemPreviewIcon /></FileUploadItemPreview
      >
      <FileUploadItemName /><FileUploadItemDeleteTrigger aria-label="Remove file" />
    </FileUploadItem>
  </FileUploadItemGroup>
</FileUpload>