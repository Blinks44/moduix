<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadClearTrigger,
    FileUploadContext,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/file-upload/file-upload-clear-trigger.module.css';
  const maxFiles = 3;
</script>

<FileUpload class={styles.root} {maxFiles}>
  <FileUploadLabel>Attachments</FileUploadLabel>
  <Stack direction="row" wrap="wrap" gap="2">
    <FileUploadTrigger>
      {#snippet asChild(props)}
        <Button {...props()}>Choose files</Button>
      {/snippet}
    </FileUploadTrigger>
    <FileUploadClearTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">Clear files</Button>
      {/snippet}
    </FileUploadClearTrigger>
  </Stack>
  <FileUploadItemGroup>
    <FileUploadContext>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name + file.size)}
          <FileUploadItem {file}>
            <FileUploadItemName />
            <FileUploadItemDeleteTrigger />
          </FileUploadItem>
        {/each}
      {/snippet}
    </FileUploadContext>
  </FileUploadItemGroup>
  <FileUploadHiddenInput />
</FileUpload>