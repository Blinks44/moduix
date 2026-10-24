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
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-controlled.module.css';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];

export default function ControlledFileUploadDemo() {
  const [files, setFiles] = createSignal(initialFiles);

  return (
    <>
      <FileUpload
        class={styles.root}
        acceptedFiles={files()}
        onFileChange={(details) => setFiles(details.acceptedFiles)}
      >
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
      <output>Selected: {files().length}</output>
    </>
  );
}