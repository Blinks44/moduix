import {
  FileUpload,
  FileUploadClearTrigger,
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
import styles from '@/components/examples/file-upload/file-upload-clear-trigger.module.css';

const maxFiles = 3;

export default function ClearTriggerFileUploadDemo() {
  return (
    <FileUpload class={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <div class={styles.actions}>
        <FileUploadTrigger>Choose files</FileUploadTrigger>
        <FileUploadClearTrigger>Clear files</FileUploadClearTrigger>
      </div>
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
  );
}
