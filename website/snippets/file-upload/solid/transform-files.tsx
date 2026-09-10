import { FileUpload } from '@moduix/solid/file-upload';
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
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Trigger>Choose images</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {(fileUpload) => (
            <For each={fileUpload().acceptedFiles}>
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
    </FileUpload>
  );
}