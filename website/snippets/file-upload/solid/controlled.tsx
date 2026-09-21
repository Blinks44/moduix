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
        <FileUploadTrigger>Choose files</FileUploadTrigger>
        <FileUploadItemGroup>
          <FileUploadContext>
            {(fileUpload) => (
              <For each={fileUpload().acceptedFiles}>
                {(file) => (
                  <FileUploadItem file={file}>
                    <FileUploadItemName />
                    <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
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
