import { Button } from '@moduix/solid/button';
import { FileUpload } from '@moduix/solid/file-upload';
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
        <FileUpload.Label>Project assets</FileUpload.Label>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
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