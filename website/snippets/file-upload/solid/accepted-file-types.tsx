import { Button } from '@moduix/solid/button';
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
import styles from '@/components/examples/file-upload/file-upload-accepted-file-types.module.css';

const accept = 'image/png,image/jpeg';
const maxFiles = 4;

export default function AcceptedTypesFileUploadDemo() {
  return (
    <FileUpload class={styles.root} accept={accept} maxFiles={maxFiles}>
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop PNG or JPEG files here</span>
          <span class={styles.dropzoneDescription}>Only PNG and JPEG files are accepted</span>
          <FileUploadTrigger asChild={(props) => <Button {...props()}>Select images</Button>} />
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
                  <FileUploadItemDeleteTrigger />
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