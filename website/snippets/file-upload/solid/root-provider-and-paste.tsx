import {
  useFileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadRootProvider,
} from '@moduix/solid/file-upload';
import { Textarea } from '@moduix/solid/textarea';
import { For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-root-provider-and-paste.module.css';

const maxFiles = 3;
const accept = 'image/*';

export default function RootProviderPasteUploadDemo() {
  const fileUpload = useFileUpload({
    maxFiles,
    accept,
  });

  return (
    <FileUploadRootProvider class={styles.root} value={fileUpload}>
      <FileUploadLabel>Images</FileUploadLabel>
      <Textarea
        placeholder="Paste an image here"
        onPaste={(event) => fileUpload().setClipboardFiles(event.clipboardData)}
      />
      <FileUploadItemGroup>
        <FileUploadContext>
          {(context) => (
            <For each={context().acceptedFiles}>
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
    </FileUploadRootProvider>
  );
}