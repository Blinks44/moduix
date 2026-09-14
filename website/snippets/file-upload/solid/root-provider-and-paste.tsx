import { FileUpload, useFileUpload } from '@moduix/solid/file-upload';
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
    <FileUpload.RootProvider class={styles.root} value={fileUpload}>
      <FileUpload.Label>Images</FileUpload.Label>
      <Textarea
        placeholder="Paste an image here"
        onPaste={(event) => fileUpload().setClipboardFiles(event.clipboardData)}
      />
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {(context) => (
            <For each={context().acceptedFiles}>
              {(file) => (
                <FileUpload.Item file={file}>
                  <FileUpload.ItemName />
                  <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.RootProvider>
  );
}