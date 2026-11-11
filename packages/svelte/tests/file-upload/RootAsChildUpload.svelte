<script lang="ts">
  import {
    FileUpload,
    FileUploadHiddenInput,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@/components/file-upload';

  let rootRef = $state<HTMLElement | null>(null);
  let triggerRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef, triggerRef });
</script>

<FileUpload bind:ref={rootRef}>
  {#snippet asChild(props)}
    <div {...props()} data-testid="custom-root">
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger bind:ref={triggerRef}>Choose files</FileUploadTrigger>
      <FileUploadHiddenInput />
    </div>
  {/snippet}
</FileUpload>