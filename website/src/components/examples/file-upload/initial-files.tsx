import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-initial-files.module.css';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];
export default function InitialFilesUploadDemo() {
  return (
    <FileUpload className={styles.root} defaultAcceptedFiles={initialFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadContext>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemName />
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
