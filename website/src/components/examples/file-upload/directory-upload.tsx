import { Button } from '@moduix/react/button';
import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-directory-upload.module.css';

const maxFiles = 20;
export default function DirectoryUploadDemo() {
  return (
    <FileUpload className={styles.root} directory maxFiles={maxFiles}>
      <FileUploadLabel>Folder</FileUploadLabel>
      <FileUploadTrigger asChild>
        <Button>Choose folder</Button>
      </FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadContext>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemName>{file.webkitRelativePath || file.name}</FileUploadItemName>
                <FileUploadItemSizeText />
                <FileUploadItemDeleteTrigger />
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}