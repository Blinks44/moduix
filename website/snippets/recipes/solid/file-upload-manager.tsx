import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@moduix/solid/card';
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
} from '@moduix/solid/file-upload';
import { For, Show } from 'solid-js';
import styles from './file-upload-manager.module.css';

const maxFiles = 5;
const maxFileSize = 10 * 1024 * 1024;

export function FileUploadManager() {
  return (
    <div class={styles.surface}>
      <FileUpload
        class={styles.fileUpload}
        accept="application/pdf,.doc,.docx,image/png,image/jpeg"
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
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
              {(api) => (
                <Show when={api().acceptedFiles.length}>
                  <CardAction>
                    <FileUploadClearTrigger class={styles.clearTrigger}>
                      Clear all
                    </FileUploadClearTrigger>
                  </CardAction>
                </Show>
              )}
            </FileUploadContext>
          </CardHeader>

          <CardBody class={styles.body}>
            <FileUploadDropzone class={styles.dropzone} disableClick>
              <FileUploadDropzoneIcon class={styles.dropzoneIcon} />
              <div class={styles.dropzoneContent}>
                <strong>Drop files here</strong>
                <span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
              </div>
              <FileUploadTrigger class={styles.trigger}>Browse files</FileUploadTrigger>
            </FileUploadDropzone>

            <FileUploadContext>
              {(api) => (
                <div class={styles.fileList}>
                  <div class={styles.listHeader}>
                    <span>Attachments</span>
                    <span class={styles.fileCount} aria-live="polite">
                      {api().acceptedFiles.length} of {maxFiles} files
                    </span>
                  </div>

                  <Show
                    when={api().acceptedFiles.length}
                    fallback={<p class={styles.emptyState}>No files added yet.</p>}
                  >
                    <FileUploadItemGroup class={styles.items}>
                      <FileUploadItems />
                    </FileUploadItemGroup>
                  </Show>

                  <Show when={api().rejectedFiles.length}>
                    <FileUploadItemGroup class={styles.rejectedItems} type="rejected">
                      <For each={api().rejectedFiles}>
                        {({ file, errors }) => (
                          <FileUploadItem file={file}>
                            <FileUploadItemName />
                            <p class={styles.error} role="alert">
                              {errors.join(', ')}
                            </p>
                            <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                          </FileUploadItem>
                        )}
                      </For>
                    </FileUploadItemGroup>
                  </Show>
                </div>
              )}
            </FileUploadContext>
          </CardBody>
        </Card>
      </FileUpload>
    </div>
  );
}
