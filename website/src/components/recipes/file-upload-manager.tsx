import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@moduix/react/card';
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
} from '@moduix/react/file-upload';
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
        <FileUploadHiddenInput />
        <Card className={styles.card}>
          <CardHeader>
            <div>
              <FileUploadLabel className={styles.title}>Project attachments</FileUploadLabel>
              <CardDescription>
                Share briefs, documents, and reference images with your team.
              </CardDescription>
            </div>
            <FileUploadContext>
              {({ acceptedFiles }) =>
                acceptedFiles.length ? (
                  <CardAction>
                    <FileUploadClearTrigger className={styles.clearTrigger}>
                      Clear all
                    </FileUploadClearTrigger>
                  </CardAction>
                ) : null
              }
            </FileUploadContext>
          </CardHeader>

          <CardBody className={styles.body}>
            <FileUploadDropzone className={styles.dropzone} disableClick>
              <FileUploadDropzoneIcon className={styles.dropzoneIcon} />
              <div className={styles.dropzoneContent}>
                <strong>Drop files here</strong>
                <span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
              </div>
              <FileUploadTrigger className={styles.trigger}>Browse files</FileUploadTrigger>
            </FileUploadDropzone>

            <FileUploadContext>
              {({ acceptedFiles, rejectedFiles }) => (
                <div className={styles.fileList}>
                  <div className={styles.listHeader}>
                    <span>Attachments</span>
                    <span className={styles.fileCount} aria-live="polite">
                      {acceptedFiles.length} of {maxFiles} files
                    </span>
                  </div>

                  {acceptedFiles.length ? (
                    <FileUploadItemGroup className={styles.items}>
                      <FileUploadItems />
                    </FileUploadItemGroup>
                  ) : (
                    <p className={styles.emptyState}>No files added yet.</p>
                  )}

                  {rejectedFiles.length ? (
                    <FileUploadItemGroup className={styles.rejectedItems} type="rejected">
                      {rejectedFiles.map(({ file, errors }) => (
                        <FileUploadItem key={`${file.name}-${file.lastModified}`} file={file}>
                          <FileUploadItemName />
                          <p className={styles.error} role="alert">
                            {errors.join(', ')}
                          </p>
                          <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                        </FileUploadItem>
                      ))}
                    </FileUploadItemGroup>
                  ) : null}
                </div>
              )}
            </FileUploadContext>
          </CardBody>
        </Card>
      </FileUpload>
    </div>
  );
}

export { FileUploadManager };
