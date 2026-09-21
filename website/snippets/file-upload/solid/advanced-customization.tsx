import {
  FileUpload,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/solid/file-upload';
import { For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-advanced-customization.module.css';

const maxFiles = 5;
const isImageFile = (file: File) => file.type.startsWith('image/');

export default function AdvancedFileUploadDemo() {
  return (
    <FileUpload class={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Project files</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drag and drop files here</span>
          <span class={styles.dropzoneDescription}>or browse from your device</span>
          <FileUploadTrigger>Browse files</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadContext>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUploadItem file={file}>
                  {isImageFile(file) ? (
                    <FileUploadItemPreview>
                      <FileUploadItemPreviewImage />
                    </FileUploadItemPreview>
                  ) : (
                    <FileUploadItemPreview>
                      <FileUploadItemPreviewIcon />
                    </FileUploadItemPreview>
                  )}
                  <FileUploadItemName />
                  <FileUploadItemMetadata file={file} />
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
