<script lang="ts">
  import {
    FileUpload,
    FileUploadDropzone,
    FileUploadHiddenInput,
    FileUploadLabel,
    FileUploadTrigger,
    type FileUploadFileChangeDetails,
  } from '@/components/file-upload';

  let { changes }: { changes?: File[][] } = $props();

  let acceptedFiles = $state<File[]>([]);

  export const getState = () => ({ acceptedFiles });
</script>

<form>
  <FileUpload
    bind:acceptedFiles
    disabled
    name="attachments"
    required
    maxFiles={2}
    onFileChange={(details: FileUploadFileChangeDetails) => changes?.push(details.acceptedFiles)}
  >
    <FileUploadLabel>Attachments</FileUploadLabel>
    <FileUploadDropzone data-testid="disabled-dropzone" />
    <FileUploadTrigger>Choose files</FileUploadTrigger>
    <FileUploadHiddenInput />
  </FileUpload>
</form>