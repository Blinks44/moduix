<script lang="ts">
  import { FileUpload, FileUploadDropzone } from '@/components/file-upload';

  let { disableClick = false }: { disableClick?: boolean } = $props();
</script>

<FileUpload>
  <FileUploadDropzone {disableClick} data-testid="dropzone" />
</FileUpload>