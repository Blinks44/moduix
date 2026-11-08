<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FileUpload,
    FileUploadContext,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@moduix/svelte/file-upload';
  import styles from '@/components/examples/file-upload/file-upload-transform-files.module.css';
  const accept = 'image/*';
  const transformFiles = async (files: File[]) =>
    files.map((file) => new File([file], file.name.toLowerCase(), { type: file.type }));
</script>

<FileUpload class={styles.root} {accept} {transformFiles}>
  <FileUploadLabel>Images</FileUploadLabel>
  <FileUploadTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Choose images</Button>
    {/snippet}
  </FileUploadTrigger>
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