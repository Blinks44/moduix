import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/file-upload';
import { For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-directory-upload.module.css';

const maxFiles = 20;

export default function DirectoryUploadDemo() {
  return (
    <FileUpload class={styles.root} directory maxFiles={maxFiles}>
      <FileUploadLabel>Folder</FileUploadLabel>
      <FileUploadTrigger asChild={(props) => <Button {...props()}>Choose folder</Button>} />
      <FileUploadItemGroup>
        <FileUploadContext>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUploadItem file={file}>
                  <FileUploadItemName>{file.webkitRelativePath || file.name}</FileUploadItemName>
                  <FileUploadItemSizeText />
                  <FileUploadItemDeleteTrigger />
                </FileUploadItem>
              )}
            </For>
          )}
        </FileUploadContext>
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}