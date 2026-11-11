<script lang="ts">
  import {
    FileUpload,
    FileUploadClearTrigger,
    FileUploadDropzone,
    FileUploadDropzoneIcon,
    FileUploadHiddenInput,
    FileUploadItemGroup,
    FileUploadItems,
    FileUploadLabel,
  } from '@/components/file-upload';

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
</script>

<FileUpload defaultAcceptedFiles={[file]}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadDropzone><FileUploadDropzoneIcon /></FileUploadDropzone>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
  <FileUploadClearTrigger>Clear files</FileUploadClearTrigger>
  <FileUploadHiddenInput />
</FileUpload>