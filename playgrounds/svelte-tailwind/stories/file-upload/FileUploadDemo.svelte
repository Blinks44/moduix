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

  let { acceptedFiles = $bindable(), maxFiles = 3, ...props }: FileUploadRootProps = $props();
</script>

<FileUpload
  {...props}
  bind:acceptedFiles
  {maxFiles}
  class="rounded-lg border border-border bg-[color-mix(in_oklab,var(--color-muted)_32%,var(--color-background))] p-4"
>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <FileUploadTrigger>
    {#snippet asChild(triggerProps)}
      <Button {...triggerProps()}>Choose files</Button>
    {/snippet}
  </FileUploadTrigger>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>