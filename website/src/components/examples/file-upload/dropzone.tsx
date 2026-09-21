import {
  FileUpload,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-dropzone.module.css';

const maxFiles = 5;
export default function FileUploadDropzoneDemo() {
  return (
    <FileUpload className={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Project files</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drag and drop files here</span>
          <span className={styles.dropzoneDescription}>or browse from your device</span>
          <FileUploadTrigger>Browse files</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
