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
  import styles from '@/components/examples/file-upload/file-upload-form-usage.module.css';
  const name = 'project-assets';
  const maxFiles = 3;
  let submitted = $state('Nothing submitted');
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    submitted = `${new FormData(event.currentTarget as HTMLFormElement).getAll(name).length} file(s) submitted`;
  };
</script>

<form class={styles.stack} onsubmit={handleSubmit}>
  <FileUpload class={styles.root} {name} {maxFiles}>
    <FileUploadLabel>Project assets</FileUploadLabel>
    <FileUploadHiddenInput />
    <FileUploadTrigger>Choose files</FileUploadTrigger>
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
  </FileUpload>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>