import {
  FileUpload,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/solid/file-upload';
import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

const maxFiles = 3;

export default function FileUploadDemo() {
  return (
    <FileUpload class={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
    </FileUpload>
  );
}
