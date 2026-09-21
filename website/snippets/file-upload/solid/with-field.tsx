import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
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
import { For } from 'solid-js';
import styles from '@/components/examples/file-upload/file-upload-with-field.module.css';

const name = 'attachments';
const maxFiles = 3;

export default function FileUploadWithFieldDemo() {
  return (
    <Field class={styles.root} required>
      <FileUpload name={name} maxFiles={maxFiles}>
        <FileUploadLabel>Required attachments</FileUploadLabel>
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
        <FileUploadHiddenInput />
      </FileUpload>
      <FieldHelperText>Upload up to three files.</FieldHelperText>
      <FieldErrorText>Upload at least one file.</FieldErrorText>
    </Field>
  );
}
