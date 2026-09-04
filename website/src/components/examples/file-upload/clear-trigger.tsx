import { FileUpload } from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-clear-trigger.module.css';

const maxFiles = 3;
export default function ClearTriggerFileUploadDemo() {
  return (
    <FileUpload className={styles.root} maxFiles={maxFiles}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <div className={styles.actions}>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ClearTrigger>Clear files</FileUpload.ClearTrigger>
      </div>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName />
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload>
  );
}