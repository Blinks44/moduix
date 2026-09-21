import {
  FileUpload,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

const maxFiles = 3;
export default function FileUploadDemo() {
  return (
    <FileUpload className={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
    </FileUpload>
  );
}
