import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@moduix/solid/card';
import { FileUpload } from '@moduix/solid/file-upload';
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
        <FileUpload.HiddenInput />
        <Card class={styles.card}>
          <CardHeader>
            <div>
              <FileUpload.Label class={styles.title}>Project attachments</FileUpload.Label>
              <CardDescription>
                Share briefs, documents, and reference images with your team.
              </CardDescription>
            </div>
            <FileUpload.Context>
              {(api) => (
                <Show when={api().acceptedFiles.length}>
                  <CardAction>
                    <FileUpload.ClearTrigger class={styles.clearTrigger}>
                      Clear all
                    </FileUpload.ClearTrigger>
                  </CardAction>
                </Show>
              )}
            </FileUpload.Context>
          </CardHeader>

          <CardBody class={styles.body}>
            <FileUpload.Dropzone class={styles.dropzone} disableClick>
              <FileUpload.DropzoneIcon class={styles.dropzoneIcon} />
              <div class={styles.dropzoneContent}>
                <strong>Drop files here</strong>
                <span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
              </div>
              <FileUpload.Trigger class={styles.trigger}>Browse files</FileUpload.Trigger>
            </FileUpload.Dropzone>

            <FileUpload.Context>
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
                    <FileUpload.ItemGroup class={styles.items}>
                      <FileUpload.Items />
                    </FileUpload.ItemGroup>
                  </Show>

                  <Show when={api().rejectedFiles.length}>
                    <FileUpload.ItemGroup class={styles.rejectedItems} type="rejected">
                      <For each={api().rejectedFiles}>
                        {({ file, errors }) => (
                          <FileUpload.Item file={file}>
                            <FileUpload.ItemName />
                            <p class={styles.error} role="alert">
                              {errors.join(', ')}
                            </p>
                            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                          </FileUpload.Item>
                        )}
                      </For>
                    </FileUpload.ItemGroup>
                  </Show>
                </div>
              )}
            </FileUpload.Context>
          </CardBody>
        </Card>
      </FileUpload>
    </div>
  );
}