import {
  FileUpload,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
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
import styles from '@/components/examples/file-upload/file-upload-rejected-files.module.css';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;

export default function RejectedFilesUploadDemo() {
  return (
    <FileUpload class={styles.root} accept={accept} maxFiles={maxFiles} maxFileSize={maxFileSize}>
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop image files here</span>
          <span class={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
          <FileUploadTrigger>Select images</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadContext>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUploadItem file={file}>
                  <FileUploadItemName />
                  <FileUploadItemSizeText />
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
  );
}