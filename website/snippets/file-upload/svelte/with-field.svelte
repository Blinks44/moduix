<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
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
  import styles from '@/components/examples/file-upload/file-upload-with-field.module.css';
  const name = 'attachments';
  const maxFiles = 3;
</script>

<Field class={styles.root} required>
  <FileUpload {name} {maxFiles}>
    <FileUploadLabel>Required attachments</FileUploadLabel>
    <FileUploadTrigger>
      {#snippet asChild(props)}
        <Button {...props()}>Choose files</Button>
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
  <FieldHelperText>Upload up to three files.</FieldHelperText>
  <FieldErrorText>Upload at least one file.</FieldErrorText>
</Field>