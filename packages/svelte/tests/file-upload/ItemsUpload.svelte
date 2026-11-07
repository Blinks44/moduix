<script lang="ts">
  import { FileUpload, FileUploadItemGroup, FileUploadItems } from '@/components/file-upload';

  let { files, maxFiles = 2 }: { files: File[]; maxFiles?: number } = $props();
</script>

<FileUpload defaultAcceptedFiles={files} {maxFiles}>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
</FileUpload>