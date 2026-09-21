import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@moduix/react/card';
import { FileUpload } from '@moduix/react/file-upload';
import styles from './file-upload-manager.module.css';

const maxFiles = 5;
const maxFileSize = 10 * 1024 * 1024;

function FileUploadManager() {
  return (
    <div className={styles.surface}>
      <FileUpload
        className={styles.fileUpload}
        accept="application/pdf,.doc,.docx,image/png,image/jpeg"
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
      >
        <FileUpload.HiddenInput />
        <Card className={styles.card}>
          <CardHeader>
            <div>
              <FileUpload.Label className={styles.title}>Project attachments</FileUpload.Label>
              <CardDescription>
                Share briefs, documents, and reference images with your team.
              </CardDescription>
            </div>
            <FileUpload.Context>
              {({ acceptedFiles }) =>
                acceptedFiles.length ? (
                  <CardAction>
                    <FileUpload.ClearTrigger className={styles.clearTrigger}>
                      Clear all
                    </FileUpload.ClearTrigger>
                  </CardAction>
                ) : null
              }
            </FileUpload.Context>
          </CardHeader>

          <CardBody className={styles.body}>
            <FileUpload.Dropzone className={styles.dropzone} disableClick>
              <FileUpload.DropzoneIcon className={styles.dropzoneIcon} />
              <div className={styles.dropzoneContent}>
                <strong>Drop files here</strong>
                <span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
              </div>
              <FileUpload.Trigger className={styles.trigger}>Browse files</FileUpload.Trigger>
            </FileUpload.Dropzone>

            <FileUpload.Context>
              {({ acceptedFiles, rejectedFiles }) => (
                <div className={styles.fileList}>
                  <div className={styles.listHeader}>
                    <span>Attachments</span>
                    <span className={styles.fileCount} aria-live="polite">
                      {acceptedFiles.length} of {maxFiles} files
                    </span>
                  </div>

                  {acceptedFiles.length ? (
                    <FileUpload.ItemGroup className={styles.items}>
                      <FileUpload.Items />
                    </FileUpload.ItemGroup>
                  ) : (
                    <p className={styles.emptyState}>No files added yet.</p>
                  )}

                  {rejectedFiles.length ? (
                    <FileUpload.ItemGroup className={styles.rejectedItems} type="rejected">
                      {rejectedFiles.map(({ file, errors }) => (
                        <FileUpload.Item key={`${file.name}-${file.lastModified}`} file={file}>
                          <FileUpload.ItemName />
                          <p className={styles.error} role="alert">
                            {errors.join(', ')}
                          </p>
                          <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                        </FileUpload.Item>
                      ))}
                    </FileUpload.ItemGroup>
                  ) : null}
                </div>
              )}
            </FileUpload.Context>
          </CardBody>
        </Card>
      </FileUpload>
    </div>
  );
}

export { FileUploadManager };