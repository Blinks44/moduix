<script lang="ts">
  import { Button } from '@/components/ui/button';
  import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@/components/ui/card';
  import {
    FileUpload,
    FileUploadClearTrigger,
    FileUploadContext,
    FileUploadDropzone,
    FileUploadDropzoneIcon,
    FileUploadHiddenInput,
    FileUploadItem,
    FileUploadItemDeleteTrigger,
    FileUploadItemGroup,
    FileUploadItemName,
    FileUploadItems,
    FileUploadLabel,
    FileUploadTrigger,
  } from '@/components/ui/file-upload';
  import styles from './file-upload-manager.module.css';

  const maxFiles = 5;
  const maxFileSize = 10 * 1024 * 1024;
</script>

<div class={styles.surface}>
  <FileUpload
    class={styles.fileUpload}
    accept="application/pdf,.doc,.docx,image/png,image/jpeg"
    {maxFiles}
    {maxFileSize}
  >
    <FileUploadHiddenInput />
    <Card class={styles.card}>
      <CardHeader>
        <div>
          <FileUploadLabel class={styles.title}>Project attachments</FileUploadLabel>
          <CardDescription>
            Share briefs, documents, and reference images with your team.
          </CardDescription>
        </div>
        <FileUploadContext>
          {#snippet render(api)}
            {#if api().acceptedFiles.length}
              <CardAction>
                <FileUploadClearTrigger>
                  {#snippet asChild(props)}
                    <Button {...props()} class={styles.clearTrigger} variant="outline" size="sm">
                      Clear all
                    </Button>
                  {/snippet}
                </FileUploadClearTrigger>
              </CardAction>
            {/if}
          {/snippet}
        </FileUploadContext>
      </CardHeader>
      <CardBody class={styles.body}>
        <FileUploadDropzone class={styles.dropzone} disableClick>
          <FileUploadDropzoneIcon class={styles.dropzoneIcon} />
          <div class={styles.dropzoneContent}>
            <strong>Drop files here</strong><span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
          </div>
          <FileUploadTrigger>
            {#snippet asChild(props)}
              <Button {...props()} class={styles.trigger}>Browse files</Button>
            {/snippet}
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadContext>
          {#snippet render(api)}
            <div class={styles.fileList}>
              <div class={styles.listHeader}>
                <span>Attachments</span>
                <span class={styles.fileCount} aria-live="polite">
                  {api().acceptedFiles.length} of {maxFiles} files
                </span>
              </div>
              {#if api().acceptedFiles.length}
                <FileUploadItemGroup class={styles.items}><FileUploadItems /></FileUploadItemGroup>
              {:else}
                <p class={styles.emptyState}>No files added yet.</p>
              {/if}
              {#if api().rejectedFiles.length}
                <FileUploadItemGroup class={styles.rejectedItems} type="rejected">
                  {#each api().rejectedFiles as { file, errors }, index (index)}
                    <FileUploadItem {file}>
                      <FileUploadItemName />
                      <p class={styles.error} role="alert">{errors.join(', ')}</p>
                      <FileUploadItemDeleteTrigger />
                    </FileUploadItem>
                  {/each}
                </FileUploadItemGroup>
              {/if}
            </div>
          {/snippet}
        </FileUploadContext>
      </CardBody>
    </Card>
  </FileUpload>
</div>