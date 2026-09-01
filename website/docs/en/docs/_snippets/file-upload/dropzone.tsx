import { FileUpload } from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-dropzone.module.css';

const maxFiles = 5;
export default function FileUploadDropzoneDemo() {
  return (
    <FileUpload className={styles.root} maxFiles={maxFiles}>
      <FileUpload.Label>Project files</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drag and drop files here</span>
          <span className={styles.dropzoneDescription}>or browse from your device</span>
          <FileUpload.Trigger>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}