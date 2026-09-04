import { FileUpload } from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-directory-upload.module.css';

const maxFiles = 20;
export default function DirectoryUploadDemo() {
  return (
    <FileUpload className={styles.root} directory maxFiles={maxFiles}>
      <FileUpload.Label>Folder</FileUpload.Label>
      <FileUpload.Trigger>Choose folder</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName>{file.webkitRelativePath || file.name}</FileUpload.ItemName>
                <FileUpload.ItemSizeText />
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