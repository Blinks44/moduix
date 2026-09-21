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
        <FileUploadLabel>Images</FileUploadLabel>
        <FileUploadTrigger>Select images</FileUploadTrigger>
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
        <FileUploadItemGroup type="rejected">
          <FileUploadContext>
            {(fileUpload) => (
              <For each={fileUpload().rejectedFiles}>
                {({ file, errors }) => (
                  <FileUploadItem file={file}>
                    <FileUploadItemName />
                    <p class={styles.error}>{errors.join(', ')}</p>
                    <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                  </FileUploadItem>
                )}
              </For>
            )}
          </FileUploadContext>
        </FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUpload>
      <output>Status: {message() || 'No files selected'}</output>
    </>
  );
}
