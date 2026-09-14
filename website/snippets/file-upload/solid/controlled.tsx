import { FileUpload } from '@moduix/solid/file-upload';
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
        <FileUpload.Label>Attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {(fileUpload) => (
              <For each={fileUpload().acceptedFiles}>
                {(file) => (
                  <FileUpload.Item file={file}>
                    <FileUpload.ItemName />
                    <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                  </FileUpload.Item>
                )}
              </For>
            )}
          </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
      </FileUpload>
      <output>Selected: {files().length}</output>
    </>
  );
}