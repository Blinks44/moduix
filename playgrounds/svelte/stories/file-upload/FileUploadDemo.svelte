<script lang="ts">
  import { Button } from '@/components/button';
  import {
    FileUpload,
    FileUploadHiddenInput,
    FileUploadItemGroup,
    FileUploadItems,
    FileUploadLabel,
    FileUploadTrigger,
    type FileUploadRootProps,
  } from '@/components/file-upload';
  import styles from './FileUpload.stories.module.css';

  let { acceptedFiles = $bindable(), maxFiles = 3, ...props }: FileUploadRootProps = $props();
</script>

<FileUpload {...props} bind:acceptedFiles {maxFiles} class={styles.simpleDemo}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadTrigger>
    {#snippet asChild(triggerProps)}
      <Button {...triggerProps()}>Choose files</Button>
    {/snippet}
  </FileUploadTrigger>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>