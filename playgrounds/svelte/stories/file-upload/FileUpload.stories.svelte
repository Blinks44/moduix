<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
  import {
    FileUpload,
    FileUploadContext,
    FileUploadDropzone,
    FileUploadDropzoneIcon,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadItemPreview,
    FileUploadItemPreviewIcon,
    FileUploadLabel,
    FileUploadRootProvider,
    FileUploadTrigger,
    useFileUpload,
  } from '@/components/file-upload';
  import { initialFiles, missingImageMimeTypeFile } from './files';
  import styles from './FileUpload.stories.module.css';
  import FileUploadDemo from './FileUploadDemo.svelte';
  import FileUploadItemList from './FileUploadItemList.svelte';

  const { Story } = defineMeta({
    title: 'Components/FileUpload',
    component: FileUpload,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let files = $state(initialFiles.slice(0, 1));
  const fileUpload = useFileUpload({
    id: 'file-upload-root-provider',
    maxFiles: 3,
    accept: 'image/*',
  });
</script>

<Story name="Basic" asChild>
  <FileUploadDemo />
</Story>

<Story name="Dropzone" asChild>
  <FileUpload maxFiles={5}>
    <FileUploadLabel>Project files</FileUploadLabel>
    <FileUploadHiddenInput />
    <FileUploadDropzone disableClick>
      <FileUploadDropzoneIcon />
      <div class={styles.dropzoneContent}>
        <span class={styles.dropzoneTitle}>Drag and drop files here</span>
        <span class={styles.dropzoneDescription}>or browse from your device</span>
        <FileUploadTrigger>
          {#snippet asChild(props)}<Button {...props()}>Browse files</Button>{/snippet}
        </FileUploadTrigger>
      </div>
    </FileUploadDropzone>
    <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
  </FileUpload>
</Story>

<Story name="Accepted Types" exportName="AcceptedTypes" asChild>
  <FileUploadDemo accept="image/png,image/jpeg" maxFiles={4} />
</Story>

<Story name="Initial Files" exportName="InitialFiles" asChild>
  <FileUploadDemo defaultAcceptedFiles={initialFiles} />
</Story>

<Story name="Missing Image Mime Type" exportName="MissingImageMimeType" asChild>
  <FileUploadDemo defaultAcceptedFiles={[missingImageMimeTypeFile]} />
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <FileUploadDemo
      acceptedFiles={files}
      onFileChange={(details) => (files = details.acceptedFiles)}
    />
    <p class={styles.state}>Selected files: {files.length}</p>
  </div>
</Story>

<Story name="Rejected Files" exportName="RejectedFiles" asChild>
  <FileUpload accept="image/*" maxFiles={2} maxFileSize={120000}>
    <FileUploadLabel>Images</FileUploadLabel>
    <FileUploadHiddenInput />
    <FileUploadDropzone disableClick>
      <FileUploadDropzoneIcon />
      <div class={styles.dropzoneContent}>
        <span class={styles.dropzoneTitle}>Drop image files here</span>
        <span class={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
        <FileUploadTrigger>
          {#snippet asChild(props)}<Button {...props()}>Select images</Button>{/snippet}
        </FileUploadTrigger>
      </div>
    </FileUploadDropzone>
    <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
    <FileUploadItemGroup type="rejected">
      <FileUploadContext>
        {#snippet render(context)}
          {#each context().rejectedFiles as { file, errors } (file.name + file.size)}
            <FileUploadItem {file}>
              <FileUploadItemPreview type=".*"><FileUploadItemPreviewIcon /></FileUploadItemPreview>
              <div>
                <FileUploadItemName />
                <p class={styles.errorText}>{errors.join(', ')}</p>
              </div>
              <FileUploadItemDeleteTrigger />
            </FileUploadItem>
          {/each}
        {/snippet}
      </FileUploadContext>
    </FileUploadItemGroup>
  </FileUpload>
</Story>

<Story name="With Field" exportName="WithField" asChild>
  <Field required>
    <FileUpload name="attachments" maxFiles={3}>
      <FileUploadLabel>Required attachments</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadTrigger>
        {#snippet asChild(props)}<Button {...props()}>Choose files</Button>{/snippet}
      </FileUploadTrigger>
      <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
    </FileUpload>
    <FieldHelperText>Upload up to three files.</FieldHelperText>
    <FieldErrorText>Upload at least one file.</FieldErrorText>
  </Field>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <FileUploadRootProvider value={fileUpload}>
    <FileUploadLabel>Images</FileUploadLabel>
    <FileUploadHiddenInput />
    <FileUploadDropzone disableClick>
      <FileUploadDropzoneIcon />
      <div class={styles.dropzoneContent}>
        <span class={styles.dropzoneTitle}>Drop images here</span>
        <span class={styles.dropzoneDescription}>or browse from your device</span>
        <FileUploadTrigger>
          {#snippet asChild(props)}<Button {...props()}>Choose images</Button>{/snippet}
        </FileUploadTrigger>
      </div>
    </FileUploadDropzone>
    <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
  </FileUploadRootProvider>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <FileUpload maxFiles={2}>
    <FileUploadLabel>Brand assets</FileUploadLabel>
    <FileUploadHiddenInput />
    <FileUploadDropzone class={styles.customDropzone} disableClick>
      <FileUploadDropzoneIcon />
      <div class={styles.dropzoneContent}>
        <span class={styles.dropzoneTitle}>Drop files here</span>
        <span class={styles.dropzoneDescription}>SVG, PNG, or PDF</span>
        <FileUploadTrigger>
          {#snippet asChild(props)}
            <Button {...props()} class={styles.customTrigger}>Browse files</Button>
          {/snippet}
        </FileUploadTrigger>
      </div>
    </FileUploadDropzone>
    <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
  </FileUpload>
</Story>