import {
  FileUpload,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/solid/file-upload';
import styles from '@/components/examples/file-upload/file-upload-dropzone.module.css';

const maxFiles = 5;

export default function FileUploadDropzoneDemo() {
  return (
    <FileUpload class={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Project files</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drag and drop files here</span>
          <span class={styles.dropzoneDescription}>or browse from your device</span>
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
