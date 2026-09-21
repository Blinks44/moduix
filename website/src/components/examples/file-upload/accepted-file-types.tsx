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
import styles from '@/components/examples/file-upload/file-upload-accepted-file-types.module.css';

const accept = 'image/png,image/jpeg';
const maxFiles = 4;
export default function AcceptedTypesFileUploadDemo() {
  return (
    <FileUpload className={styles.root} accept={accept} maxFiles={maxFiles}>
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop PNG or JPEG files here</span>
          <span className={styles.dropzoneDescription}>Only PNG and JPEG files are accepted</span>
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
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
