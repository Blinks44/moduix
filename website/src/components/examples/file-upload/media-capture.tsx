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
import styles from '@/components/examples/file-upload/file-upload-media-capture.module.css';

const capture = 'environment';
const accept = 'image/*';
const maxFiles = 1;
export default function MediaCaptureUploadDemo() {
  return (
    <FileUpload className={styles.root} accept={accept} capture={capture} maxFiles={maxFiles}>
      <FileUploadLabel>Photo</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop an image or open the camera</span>
          <span className={styles.dropzoneDescription}>One image from the environment camera</span>
          <FileUploadTrigger>Open camera</FileUploadTrigger>
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