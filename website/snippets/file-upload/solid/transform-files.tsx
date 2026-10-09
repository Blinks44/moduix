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
import styles from '@/components/examples/file-upload/file-upload-transform-files.module.css';

const accept = 'image/*';

async function transformFiles(files: File[]) {
  return files.map(
    (file) =>
      new File([file], file.name.toLowerCase(), {
        type: file.type,
      }),
  );
}

export default function TransformFilesUploadDemo() {
  return (
    <FileUpload class={styles.root} accept={accept} transformFiles={transformFiles}>
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadTrigger>Choose images</FileUploadTrigger>
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