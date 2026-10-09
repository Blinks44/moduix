import { Button } from '@moduix/solid/button';
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
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-form-usage.module.css';

const name = 'project-assets';
const maxFiles = 3;

export default function FileUploadFormDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    setSubmitted(`${new FormData(event.currentTarget).getAll(name).length} file(s) submitted`);
  };

  return (
    <form class={styles.stack} onSubmit={handleSubmit}>
      <FileUpload class={styles.root} name={name} maxFiles={maxFiles}>
        <FileUploadLabel>Project assets</FileUploadLabel>
        <FileUploadHiddenInput />
        <FileUploadTrigger>Choose files</FileUploadTrigger>
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
      </FileUpload>
      <div>
        <output>Submitted: {submitted()}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}