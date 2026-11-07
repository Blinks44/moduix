<script lang="ts">
  import { FileUpload, FileUploadItemGroup, FileUploadItems } from '@/components/file-upload';

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
  const translations = { deleteFile: (item: File) => `Delete ${item.name}` };
</script>

<FileUpload defaultAcceptedFiles={[file]} {translations}>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
</FileUpload>