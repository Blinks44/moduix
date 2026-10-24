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
import styles from '@/components/examples/file-upload/file-upload-media-capture.module.css';

const capture = 'environment';
const accept = 'image/*';
const maxFiles = 1;

export default function MediaCaptureUploadDemo() {
  return (
    <FileUpload class={styles.root} accept={accept} capture={capture} maxFiles={maxFiles}>
      <FileUploadLabel>Photo</FileUploadLabel>
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop an image or open the camera</span>
          <span class={styles.dropzoneDescription}>One image from the environment camera</span>
          <FileUploadTrigger asChild={(props) => <Button {...props()}>Open camera</Button>} />
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