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
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-rejected-files.module.css';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
export default function RejectedFilesUploadDemo() {
  return (
    <FileUpload
      className={styles.root}
      accept={accept}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
    >
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop image files here</span>
          <span className={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
          <FileUploadTrigger>Select images</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadContext>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemName />
                <FileUploadItemSizeText />
                <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>
      <FileUploadItemGroup type="rejected">
        <FileUploadContext>
          {({ rejectedFiles }) =>
            rejectedFiles.map(({ file, errors }) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemName />
                <p className={styles.error}>{errors.join(', ')}</p>
                <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
