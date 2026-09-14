import { FileUpload } from '@moduix/solid/file-upload';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-error-handling.module.css';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;

export default function ErrorHandlingFileUploadDemo() {
  const [message, setMessage] = createSignal('');

  return (
    <>
      <FileUpload
        class={styles.root}
        accept={accept}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        onFileReject={(details) => setMessage(`${details.files.length} file(s) rejected`)}
        onFileAccept={() => setMessage('Files accepted')}
      >
        <FileUpload.Label>Images</FileUpload.Label>
        <FileUpload.Trigger>Select images</FileUpload.Trigger>
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
        <FileUpload.ItemGroup type="rejected">
          <FileUpload.Context>
            {(fileUpload) => (
              <For each={fileUpload().rejectedFiles}>
                {({ file, errors }) => (
                  <FileUpload.Item file={file}>
                    <FileUpload.ItemName />
                    <p class={styles.error}>{errors.join(', ')}</p>
                    <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                  </FileUpload.Item>
                )}
              </For>
            )}
          </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
      </FileUpload>
      <output>Status: {message() || 'No files selected'}</output>
    </>
  );
}