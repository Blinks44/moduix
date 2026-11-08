<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadHiddenInput,
    FileUploadItemGroup,
    FileUploadItems,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

  const maxFiles = 3;
</script>

<FileUpload class={styles.root} {maxFiles}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadHiddenInput />
  <FileUploadTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Choose files</Button>
    {/snippet}
  </FileUploadTrigger>
  <FileUploadItemGroup>
    <FileUploadItems />
  </FileUploadItemGroup>
</FileUpload>