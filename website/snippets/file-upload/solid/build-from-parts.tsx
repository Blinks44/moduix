import { Button } from '@moduix/solid/button';
import {
  FileUpload,
  FileUploadContext,
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
import { Trash2 as TrashIcon } from 'lucide-solid';
import { For, Show } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

const maxFiles = 3;
const isImageFile = (file: File) => file.type.startsWith('image/');

export default function BuildFromPartsFileUploadDemo() {
  return (
    <FileUpload class={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadTrigger asChild={(props) => <Button {...props()}>Choose files</Button>} />
      <FileUploadItemGroup>
        <FileUploadContext>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
              {(file) => (
                <FileUploadItem file={file}>
                  <FileUploadItemPreview>
                    <Show when={isImageFile(file)} fallback={<FileUploadItemPreviewIcon />}>
                      <FileUploadItemPreviewImage />
                    </Show>
                  </FileUploadItemPreview>
                  <FileUploadItemName />
                  <FileUploadItemMetadata file={file} />
                  <FileUploadItemDeleteTrigger>
                    <TrashIcon />
                  </FileUploadItemDeleteTrigger>
                </FileUploadItem>
              )}
            </For>
          )}
        </FileUploadContext>
      </FileUploadItemGroup>
    </FileUpload>
  );
}