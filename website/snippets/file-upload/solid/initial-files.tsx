import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/file-upload';
import { For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-initial-files.module.css';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];

export default function InitialFilesUploadDemo() {
  return (
    <FileUpload class={styles.root} defaultAcceptedFiles={initialFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger asChild={(props) => <Button {...props()}>Choose files</Button>} />
      <FileUploadItemGroup>
        <FileUploadContext>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUploadItem file={file}>
                  <FileUploadItemName />
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