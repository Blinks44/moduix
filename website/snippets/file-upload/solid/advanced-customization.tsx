import { FileUpload } from '@moduix/solid/file-upload';
import { For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-advanced-customization.module.css';

const maxFiles = 5;
const isImageFile = (file: File) => file.type.startsWith('image/');

export default function AdvancedFileUploadDemo() {
  return (
    <FileUpload class={styles.root} maxFiles={maxFiles}>
      <FileUpload.Label>Project files</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drag and drop files here</span>
          <span class={styles.dropzoneDescription}>or browse from your device</span>
          <FileUpload.Trigger>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUpload.Item file={file}>
                  {isImageFile(file) ? (
                    <FileUpload.ItemPreview>
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                  ) : (
                    <FileUpload.ItemPreview>
                      <FileUpload.ItemPreviewIcon />
                    </FileUpload.ItemPreview>
                  )}
                  <FileUpload.ItemName />
                  <FileUpload.ItemMetadata file={file} />
                  <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload>
  );
}