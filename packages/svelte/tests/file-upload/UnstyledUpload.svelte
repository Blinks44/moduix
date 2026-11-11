<script lang="ts">
  import { FileUpload, FileUploadClearTrigger, FileUploadTrigger } from '@/components/file-upload';

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
</script>

<FileUpload defaultAcceptedFiles={[file]}>
  <FileUploadTrigger>Choose files</FileUploadTrigger>
  <FileUploadClearTrigger>Clear files</FileUploadClearTrigger>
</FileUpload>