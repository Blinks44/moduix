<script lang="ts">
  import {
    useFileUpload,
    FileUploadContext,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadLabel,
    FileUploadRootProvider,
  } from '@moduix/svelte/file-upload';
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/file-upload/file-upload-root-provider-and-paste.module.css';
  const maxFiles = 3;
  const accept = 'image/*';
  const id = $props.id();
  const fileUpload = useFileUpload({ id, maxFiles, accept });
</script>

<FileUploadRootProvider class={styles.root} value={fileUpload}>
  <FileUploadLabel>Images</FileUploadLabel>
  <Textarea
    placeholder="Paste an image here"
    onpaste={(event) => fileUpload().setClipboardFiles(event.clipboardData)}
  />
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
</FileUploadRootProvider>